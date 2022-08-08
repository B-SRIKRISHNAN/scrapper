echo "***************************************************************************"
echo "Welcome to script runner, your shortcut to spring boot projects"
echo "***************************************************************************"
echo "please enter config"
$groupId = Read-Host -prompt "Enter group path (eg :com.niit)"
$filename = Read-Host -prompt "Enter artifact name"

$input = "groupId: "+$groupId +"`n"+ "artifactId: " + $filename
$input | Out-File -FilePath "C:\Users\bsk19\OneDrive\Desktop\BSK\Project to fill my song and podcast db\scrapper\projectConfig.txt" -encoding utf8

# $path = "OneDrive\Desktop\BSK\Project to fill my song and podcast db\scrapper\testScrapper.js"
Set-Location "./Onedrive/Desktop/BSK/Project to fill my song and podcast db/scrapper"
java "AspectEditor.java"
# cd ../../../
node testScrapper.js
$download = "C:\Users\bsk19\Downloads\"+$filename+".zip"
$toPath = Read-Host -prompt "Enter unzip directory"
expand-archive -literalPath $download -DestinationPath $toPath
Set-Location $toPath
# $groupId = Read-Host -prompt "Enter group path (eg :com/niit)"
$groupPath = $groupId.Replace(".", "/")
$mainpath = $filename + "/src/main/java/"+ $groupPath + "/" + $filename
Set-Location $mainpath
mkdir controller
mkdir services
mkdir model
mkdir exceptions
mkdir repository
mkdir aspects
mkdir security
mkdir filter
copy-item -path "C:\Users\bsk19\OneDrive\Desktop\BSK\Project to fill my song and podcast db\scrapper\LoggerAspect.java" -Destination "./aspects"
Set-Location ../../../../resources
# new-item logback.xml
$pathToCopy = Get-Location
copy-item -Path "C:\Users\bsk19\OneDrive\Desktop\BSK\Project to fill my song and podcast db\scrapper\logback.xml" -Destination $pathToCopy

Set-Location ../../../
new-item Dockerfile
Set-Location "c:/users/bsk19"