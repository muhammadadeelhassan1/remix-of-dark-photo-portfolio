import os
import sys
import urllib.request
import concurrent.futures
import gzip
import shutil
import time

URL = "https://github.com/eugeneware/ffmpeg-static/releases/download/b6.1.1/ffmpeg-win32-x64.gz"
DEST_GZ = "ffmpeg-win32-x64.gz"
DEST_EXE = "ffmpeg.exe"
CHUNK_DIR = "temp_ffmpeg_chunks"
NUM_THREADS = 6

def get_final_url_and_size(url):
    req = urllib.request.Request(url, headers={"User-Agent": "Mozilla/5.0"}, method="HEAD")
    with urllib.request.urlopen(req, timeout=20) as resp:
        return resp.geturl(), int(resp.headers.get("Content-Length", 0))

def download_chunk_with_retry(final_url, start, end, chunk_id, expected_size):
    chunk_file = os.path.join(CHUNK_DIR, f"chunk_{chunk_id}.bin")
    if os.path.exists(chunk_file) and os.path.getsize(chunk_file) == expected_size:
        print(f"Chunk {chunk_id} already cached ({expected_size/(1024*1024):.2f} MB)", flush=True)
        return chunk_id

    for attempt in range(1, 10):
        try:
            print(f"Downloading chunk {chunk_id} (attempt {attempt})...", flush=True)
            headers = {"User-Agent": "Mozilla/5.0", "Range": f"bytes={start}-{end}"}
            req = urllib.request.Request(final_url, headers=headers)
            with urllib.request.urlopen(req, timeout=30) as resp:
                part_file = chunk_file + ".part"
                with open(part_file, "wb") as f:
                    while True:
                        block = resp.read(65536)
                        if not block:
                            break
                        f.write(block)
                actual_size = os.path.getsize(part_file)
                if actual_size == expected_size:
                    os.replace(part_file, chunk_file)
                    print(f"Chunk {chunk_id} COMPLETE! ({expected_size/(1024*1024):.2f} MB)", flush=True)
                    return chunk_id
                else:
                    print(f"Chunk {chunk_id} partial {actual_size}/{expected_size}, retrying...", flush=True)
        except Exception as e:
            print(f"Chunk {chunk_id} error: {e}, retrying...", flush=True)
            time.sleep(1)
    raise RuntimeError(f"Failed to download chunk {chunk_id}")

def main():
    if os.path.exists(DEST_EXE) and os.path.getsize(DEST_EXE) > 10 * 1024 * 1024:
        print(f"{DEST_EXE} already exists and is valid!", flush=True)
        return

    os.makedirs(CHUNK_DIR, exist_ok=True)
    print("Checking download URL and total size...", flush=True)
    final_url, total_size = get_final_url_and_size(URL)
    print(f"Total size: {total_size / (1024*1024):.2f} MB across {NUM_THREADS} chunks", flush=True)

    chunk_size = total_size // NUM_THREADS
    ranges = []
    for i in range(NUM_THREADS):
        start = i * chunk_size
        end = total_size - 1 if i == NUM_THREADS - 1 else (i + 1) * chunk_size - 1
        expected = end - start + 1
        ranges.append((start, end, i, expected))

    with concurrent.futures.ThreadPoolExecutor(max_workers=NUM_THREADS) as executor:
        futures = [
            executor.submit(download_chunk_with_retry, final_url, start, end, idx, expected)
            for start, end, idx, expected in ranges
        ]
        concurrent.futures.wait(futures)

    # Verify all chunks exist
    for _, _, idx, expected in ranges:
        cf = os.path.join(CHUNK_DIR, f"chunk_{idx}.bin")
        if not os.path.exists(cf) or os.path.getsize(cf) != expected:
            raise RuntimeError(f"Chunk {idx} is missing or incomplete!")

    print(f"All {NUM_THREADS} chunks verified. Assembling {DEST_GZ}...", flush=True)
    with open(DEST_GZ, "wb") as f_out:
        for i in range(NUM_THREADS):
            cf = os.path.join(CHUNK_DIR, f"chunk_{i}.bin")
            with open(cf, "rb") as f_in:
                shutil.copyfileobj(f_in, f_out)

    print(f"Decompressing {DEST_GZ} to {DEST_EXE}...", flush=True)
    with gzip.open(DEST_GZ, "rb") as f_in:
        with open(DEST_EXE, "wb") as f_out:
            shutil.copyfileobj(f_in, f_out)

    # Cleanup temp files
    shutil.rmtree(CHUNK_DIR, ignore_errors=True)
    if os.path.exists(DEST_GZ):
        os.remove(DEST_GZ)

    exe_size = os.path.getsize(DEST_EXE)
    print(f"DONE! {DEST_EXE} ready ({exe_size / (1024*1024):.2f} MB)", flush=True)

if __name__ == "__main__":
    main()
