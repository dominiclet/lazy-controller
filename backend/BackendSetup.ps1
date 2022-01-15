Write-Host "Setting up port forwarding from windows to WSL"
$WSLAddress = Read-Host -Prompt 'WSL address'
$Port = Read-Host -Prompt 'Port'

netsh interface portproxy add v4tov4 listenport=$Port listenaddress=0.0.0.0 connectport=$Port connectaddress=$WSLAddress

Write-Host "Forwarded traffic from port $Port on this computer to port $Port at $WSLAddress"

$env:HOST = (
    Get-NetIPConfiguration |
    Where-Object {
        $_.IPv4DefaultGateway -ne $null -and
        $_.NetAdapter.Status -ne "Disconnected"
    }
).IPv4Address.IPAddress

Write-Host "Set server host to $env:HOST"