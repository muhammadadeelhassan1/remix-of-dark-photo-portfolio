import subprocess
import os
import gzip
import shutil
import concurrent.futures

URL = "https://github.com/eugeneware/ffmpeg-static/releases/download/b6.1.1/ffmpeg-win32-x64.gz"
TOTAL_SIZE = 29581307
NUM_CHUNKS = 8
CHUNK_DIR = "curl_chunks"
DEST_GZ = "ffmpeg-win32-x64.gz"
DEST_EXE = "ffmpeg.exe"

def download_chunk(i):
    chunk_size = TOTAL_SIZE // NUM_CHUNKS
    start = i * chunk_size
    end = TOTAL_SIZE - 1 if i == NUM_CHUNKS - 1 else (i + 1) * chunk_size - 1
    out_file = os.path.join(CHUNK_DIR, f"chunk_{i}.bin")
    expected = end - start + 1
    if os.path.exists(out_file) and os.path.getsize(out_file) == expected:
        print(f"Chunk {i} already cached ({expected/(1024*1024):.2f} MB)", flush=True)
        return i
    print(f"Downloading chunk {i} ({start}-{end}, {expected/(1024*1024):.2f} MB)...", flush=True)
    cmd = [
        "curl.exe", "-s", "-L",
        "--retry", "5",
        "--retry-delay", "1",
        "-r", f"{start}-{end}",
        "-o", out_file,
        URL
    ]
    subprocess.run(cmd, check=True)
    if os.path.getsize(out_file) != expected:
        raise Exception(f"Chunk {i} size mismatch: got {os.path.getsize(out_file)} != {expected}")
    print(f"Chunk {i} COMPLETE! ({expected/(1024*1024):.2f} MB)", flush=True)
    return i

def main():
    if os.path.exists(DEST_EXE) and os.path.getsize(DEST_EXE) > 10 * 1024 * 1024:
        print(f"{DEST_EXE} already exists and valid!", flush=True)
        return

    os.makedirs(CHUNK_DIR, exist_ok=True)
    print(f"Starting parallel curl download of {TOTAL_SIZE/(1024*1024):.2f} MB in {NUM_CHUNKS} parts...", flush=True)

    with concurrent.futures.ThreadPoolExecutor(max_workers=NUM_CHUNKS) as pool:
        results = list(pool.map(download_chunk, range(NUM_CHUNKS)))

    print("All chunks downloaded! Assembling .gz file...", flush=True)
    with open(DEST_GZ, "wb") as f_out:
        for i in range(NUM_CHUNKS):
            with open(os.path.join(CHUNK_DIR, f"chunk_{i}.bin"), "rb") as f_in:
                shutil.copyfileobj(f_in, f_out)

    print(f"Decompressing {DEST_GZ} to {DEST_EXE}...", flush=True)
    with gzip.open(DEST_GZ, "rb") as f_in:
        with open(DEST_EXE, "wb") as f_out:
            shutil.copyfileobj(f_in, f_out)

    shutil.rmtree(CHUNK_DIR, ignore_errors=True)
    if os.path.exists(DEST_GZ):
        os.remove(DEST_GZ)

    print(f"SUCCESS! {DEST_EXE} ready ({os.path.getsize(DEST_EXE)/(1024*1024):.2f} MB)", flush=True)

if __name__ == "__main__":
    main()
