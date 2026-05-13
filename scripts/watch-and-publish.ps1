[CmdletBinding()]
param(
  [int]$IntervalSeconds = 20,
  [int]$IdleSeconds = 90,
  [switch]$SkipChecks
)

Set-StrictMode -Version Latest
$ErrorActionPreference = "Stop"

$mutexName = "Global\NikitaKononenkoPortfolioAutoPublish"
$mutex = New-Object System.Threading.Mutex($false, $mutexName)

if (-not $mutex.WaitOne(0)) {
  Write-Host "Watcher is already running."
  exit 0
}

$repoRoot = (git rev-parse --show-toplevel).Trim()
Set-Location $repoRoot

$publishScript = Join-Path $repoRoot "scripts/publish.ps1"
$lastSignature = ""
$lastChangeAt = Get-Date

Write-Host "Watching $repoRoot"
Write-Host "When git changes stay idle for $IdleSeconds seconds, they will be committed, pushed to GitHub, then Netlify can deploy the push."
Write-Host "Press Ctrl+C to stop."

try {
  while ($true) {
    $statusLines = git status --porcelain
    $signature = ($statusLines | Out-String)

    if ($signature -ne $lastSignature) {
      $lastSignature = $signature
      $lastChangeAt = Get-Date

      if ($statusLines) {
        Write-Host "Changes detected. Waiting for an idle window..."
      }
    }

    if ($statusLines -and ((Get-Date) - $lastChangeAt).TotalSeconds -ge $IdleSeconds) {
      $stamp = Get-Date -Format "yyyy-MM-dd HH:mm"
      $args = @("-NoProfile", "-ExecutionPolicy", "Bypass", "-File", $publishScript, "-Message", "Auto publish $stamp")

      if ($SkipChecks) {
        $args += "-SkipChecks"
      }

      & powershell @args

      $lastSignature = ""
      $lastChangeAt = Get-Date
    }

    Start-Sleep -Seconds $IntervalSeconds
  }
} finally {
  $mutex.ReleaseMutex()
  $mutex.Dispose()
}
