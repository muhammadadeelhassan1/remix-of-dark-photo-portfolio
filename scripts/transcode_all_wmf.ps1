Add-Type -AssemblyName System.Runtime.WindowsRuntime

# Preload WinRT types
[Windows.Storage.StorageFile, Windows.Storage, ContentType=WindowsRuntime] | Out-Null
[Windows.Storage.StorageFolder, Windows.Storage, ContentType=WindowsRuntime] | Out-Null
[Windows.Storage.CreationCollisionOption, Windows.Storage, ContentType=WindowsRuntime] | Out-Null
[Windows.Media.Transcoding.MediaTranscoder, Windows.Media.Transcoding, ContentType=WindowsRuntime] | Out-Null
[Windows.Media.MediaProperties.MediaEncodingProfile, Windows.Media.MediaProperties, ContentType=WindowsRuntime] | Out-Null
[Windows.Media.MediaProperties.VideoEncodingQuality, Windows.Media.MediaProperties, ContentType=WindowsRuntime] | Out-Null

$asTaskGeneric = ([System.WindowsRuntimeSystemExtensions].GetMethods() | ? { $_.Name -eq 'AsTask' -and $_.GetParameters().Count -eq 1 -and $_.GetParameters()[0].ParameterType.Name -eq 'IAsyncOperation`1' })[0]
Function Await($WinRtTask, $ResultType) {
    $asTask = $asTaskGeneric.MakeGenericMethod($ResultType)
    $netTask = $asTask.Invoke($null, @($WinRtTask))
    $netTask.Wait(-1) | Out-Null
    $netTask.Result
}
Function AwaitAction($WinRtAction) {
    $asTask = ([System.WindowsRuntimeSystemExtensions].GetMethods() | ? { $_.Name -eq 'AsTask' -and $_.GetParameters().Count -eq 1 -and $_.GetParameters()[0].ParameterType.Name -eq 'IAsyncActionWithProgress`1' })[0]
    if (!$asTask) {
        $asTask = ([System.WindowsRuntimeSystemExtensions].GetMethods() | ? { $_.Name -eq 'AsTask' -and $_.GetParameters().Count -eq 1 -and $_.GetParameters()[0].ParameterType.Name -eq 'IAsyncAction' })[0]
        $netTask = $asTask.Invoke($null, @($WinRtAction))
    } else {
        $asTaskSpecific = $asTask.MakeGenericMethod([System.Double])
        $netTask = $asTaskSpecific.Invoke($null, @($WinRtAction))
    }
    $netTask.Wait(-1) | Out-Null
}

$videoDir = (Resolve-Path "src/assets/videos").Path
$tmpDir = Join-Path $videoDir "optimized"
if (!(Test-Path $tmpDir)) { New-Item -ItemType Directory -Path $tmpDir | Out-Null }

$videos = Get-ChildItem -Path $videoDir -Filter "v*.mp4" | Sort-Object Name
Write-Host "Found $($videos.Count) videos to optimize for web streaming..."

$dstFolder = Await ([Windows.Storage.StorageFolder]::GetFolderFromPathAsync($tmpDir)) ([Windows.Storage.StorageFolder])
$transcoder = [Windows.Media.Transcoding.MediaTranscoder]::new()

$totalOrig = 0
$totalOpt = 0

foreach ($vid in $videos) {
    $inputPath = $vid.FullName
    $filename = $vid.Name
    $outputPath = Join-Path $tmpDir $filename
    $origSize = $vid.Length

    Write-Host "`nOptimizing $filename ($([math]::Round($origSize / 1MB, 1)) MB)..." -NoNewline

    $srcFile = Await ([Windows.Storage.StorageFile]::GetFileFromPathAsync($inputPath)) ([Windows.Storage.StorageFile])
    $dstFile = Await ($dstFolder.CreateFileAsync($filename, [Windows.Storage.CreationCollisionOption]::ReplaceExisting)) ([Windows.Storage.StorageFile])

    # 720p HD with 900 kbps video + 128 kbps AAC audio for crystal clear fast streaming
    $profile = [Windows.Media.MediaProperties.MediaEncodingProfile]::CreateMp4([Windows.Media.MediaProperties.VideoEncodingQuality]::HD720p)
    $profile.Video.Bitrate = 900000
    $profile.Audio.Bitrate = 128000

    $sw = [System.Diagnostics.Stopwatch]::StartNew()
    $prepareOp = Await ($transcoder.PrepareFileTranscodeAsync($srcFile, $dstFile, $profile)) ([Windows.Media.Transcoding.PrepareTranscodeResult])

    if ($prepareOp.CanTranscode) {
        $action = $prepareOp.TranscodeAsync()
        AwaitAction $action
        $sw.Stop()
        $optSize = (Get-Item $outputPath).Length
        $totalOrig += $origSize
        $totalOpt += $optSize
        $pct = [math]::Round((1 - ($optSize / $origSize)) * 100, 1)
        Write-Host " Done in $([math]::Round($sw.Elapsed.TotalSeconds, 1))s -> $([math]::Round($optSize / 1MB, 1)) MB ($pct% smaller)"
    } else {
        Write-Host " FAILED: $($prepareOp.FailureReason)"
    }
}

Write-Host "`n=========================================="
Write-Host "Total original size: $([math]::Round($totalOrig / 1MB, 1)) MB"
Write-Host "Total optimized size: $([math]::Round($totalOpt / 1MB, 1)) MB"
Write-Host "Bandwidth reduction: $([math]::Round((1 - ($totalOpt / $totalOrig)) * 100, 1))%"
Write-Host "=========================================="
