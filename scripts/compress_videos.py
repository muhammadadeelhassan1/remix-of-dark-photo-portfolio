import os
import glob
import subprocess
import shutil
import time

def find_ffmpeg():
    # 0. Current directory or script directory
    for candidate in ["ffmpeg.exe", os.path.join(os.path.dirname(__file__), "..", "ffmpeg.exe")]:
        if os.path.exists(candidate):
            return os.path.abspath(candidate)
    # 1. System PATH
    p = shutil.which("ffmpeg")
    if p:
        return p
    # 2. Chocolatey path
    choco_p = r"C:\ProgramData\chocolatey\bin\ffmpeg.exe"
    if os.path.exists(choco_p):
        return choco_p
    choco_lib = glob.glob(r"C:\ProgramData\chocolatey\lib\ffmpeg\**\ffmpeg.exe", recursive=True)
    if choco_lib:
        return choco_lib[0]
    # 3. Node modules
    nm = glob.glob(r"node_modules\**\ffmpeg.exe", recursive=True)
    if nm:
        return os.path.abspath(nm[0])
    # 4. WinGet
    wg = glob.glob(os.path.expandvars(r"%LOCALAPPDATA%\Microsoft\WinGet\Packages\**\ffmpeg.exe"), recursive=True)
    if wg:
        return wg[0]
    # 5. Temp
    temp_matches = glob.glob(os.path.expandvars(r"%TEMP%\**\ffmpeg.exe"), recursive=True)
    if temp_matches:
        return temp_matches[0]
    return None

def main():
    ffmpeg_bin = find_ffmpeg()
    if not ffmpeg_bin:
        print("ERROR: ffmpeg not found yet!")
        return

    print(f"Using ffmpeg: {ffmpeg_bin}")
    video_dir = os.path.abspath("src/assets/videos")
    out_dir = os.path.join(video_dir, "compressed")
    os.makedirs(out_dir, exist_ok=True)

    videos = sorted([f for f in os.listdir(video_dir) if f.startswith("v") and f.endswith(".mp4")])
    print(f"Found {len(videos)} videos to compress.")

    total_orig = 0
    total_comp = 0

    for idx, filename in enumerate(videos, 1):
        input_path = os.path.join(video_dir, filename)
        output_path = os.path.join(out_dir, filename)
        orig_size = os.path.getsize(input_path)
        total_orig += orig_size

        print(f"\n[{idx}/{len(videos)}] Compressing {filename} ({orig_size / (1024*1024):.2f} MB)...")
        start_time = time.time()

        # Web optimization parameters:
        # - Max 720p resolution (scale to 720p height or 1280 width if larger, maintain aspect ratio)
        # - H.264 video codec
        # - crf 26 (excellent quality for animation/rhymes, 85%+ size reduction)
        # - preset fast
        # - AAC audio 128kbps
        # - faststart enabled for progressive streaming
        cmd = [
            ffmpeg_bin,
            "-y",
            "-i", input_path,
            "-vf", "scale='min(1280,iw)':'-2'",
            "-c:v", "libx264",
            "-pix_fmt", "yuv420p",
            "-crf", "26",
            "-preset", "veryfast",
            "-c:a", "aac",
            "-b:a", "128k",
            "-movflags", "+faststart",
            output_path
        ]

        res = subprocess.run(cmd, stdout=subprocess.DEVNULL, stderr=subprocess.PIPE, text=True)
        if res.returncode != 0:
            print(f"Error compressing {filename}: {res.stderr[-300:]}")
            continue

        comp_size = os.path.getsize(output_path)
        total_comp += comp_size
        savings = (1 - (comp_size / orig_size)) * 100
        elapsed = time.time() - start_time
        print(f"  Done in {elapsed:.1f}s: {orig_size / (1024*1024):.2f} MB -> {comp_size / (1024*1024):.2f} MB ({savings:.1f}% reduction)")

    print("\n" + "=" * 50)
    print(f"All done! Total original: {total_orig / (1024*1024):.2f} MB")
    print(f"Total compressed: {total_comp / (1024*1024):.2f} MB")
    print(f"Total bandwidth saved: {((total_orig - total_comp) / (1024*1024)):.2f} MB ({(1 - total_comp/total_orig)*100:.1f}%)")
    print("=" * 50)

if __name__ == "__main__":
    main()
