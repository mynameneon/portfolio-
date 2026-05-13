[CmdletBinding()]
param(
  [string]$Message = "",
  [switch]$SkipChecks
)

Set-StrictMode -Version Latest
$ErrorActionPreference = "Stop"

$repoRoot = (git rev-parse --show-toplevel).Trim()
Set-Location $repoRoot

$branch = (git branch --show-current).Trim()
if (-not $branch) {
  throw "Could not resolve the current git branch."
}

if (-not $SkipChecks) {
  npm run lint
  npm run typecheck
  npm run build
}

git add -A

$status = git status --porcelain
if (-not $status) {
  Write-Host "No changes to publish."
  exit 0
}

if (-not $Message) {
  $stamp = Get-Date -Format "yyyy-MM-dd HH:mm"
  $Message = "Update portfolio $stamp"
}

git commit -m $Message
git pull --rebase origin $branch
git push origin $branch

Write-Host "Published to GitHub. Netlify will deploy the pushed commit if the site is connected to this repository."
