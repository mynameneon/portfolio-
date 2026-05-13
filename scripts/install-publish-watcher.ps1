[CmdletBinding()]
param()

Set-StrictMode -Version Latest
$ErrorActionPreference = "Stop"

$repoRoot = (git rev-parse --show-toplevel).Trim()
$watchScript = Join-Path $repoRoot "scripts\watch-and-publish.ps1"
$taskName = "NikitaPortfolioAutoPublish"

$actionArgs = "-NoProfile -ExecutionPolicy Bypass -File `"$watchScript`""

try {
  $action = New-ScheduledTaskAction -Execute "powershell.exe" -Argument $actionArgs -WorkingDirectory $repoRoot
  $trigger = New-ScheduledTaskTrigger -AtLogOn
  $settings = New-ScheduledTaskSettingsSet -AllowStartIfOnBatteries -DontStopIfGoingOnBatteries -ExecutionTimeLimit (New-TimeSpan -Days 30)

  Register-ScheduledTask -TaskName $taskName -Action $action -Trigger $trigger -Settings $settings -Description "Auto commit and push Nikita portfolio changes to GitHub for Netlify deploys." -Force | Out-Null

  Write-Host "Installed scheduled task: $taskName"
  Write-Host "It will start the publish watcher when this Windows user logs in."
} catch {
  $startupFolder = [Environment]::GetFolderPath("Startup")
  $startupFile = Join-Path $startupFolder "$taskName.cmd"
  $startupContent = @(
    "@echo off",
    "cd /d `"$repoRoot`"",
    "powershell.exe $actionArgs"
  ) -join "`r`n"

  Set-Content -LiteralPath $startupFile -Value $startupContent -Encoding ASCII

  Write-Host "Could not install scheduled task, installed Startup command instead:"
  Write-Host $startupFile
}
