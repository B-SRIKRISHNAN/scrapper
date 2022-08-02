$path =   "OneDrive\Desktop\BSK\Project to fill my song and podcast db\scrapper\testScrapper.js"
node $path
$filename = Read-Host -prompt "Enter artifact name "
$download = "C:\Users\bsk19\Downloads\"+$filename+".zip"
$toPath = Read-Host -prompt "Enter unzip directory"
expand-archive -literalPath $download -DestinationPath $toPath
Set-Location $toPath
$groupId = Read-Host -prompt "Enter group path (eg :com/niit)"
$mainpath = $filename + "/src/main/java/"+ $groupId + "/" + $filename
Set-Location $mainpath
mkdir controller
mkdir services
mkdir model
mkdir repository
mkdir aspects
Set-Location ../../../../resources
new-item logback.xml
Set-Location ../../../

 