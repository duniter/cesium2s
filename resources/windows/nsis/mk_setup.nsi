Name "##APP_NAME##"
Outfile "##NSIS_OUT_FILE##"
RequestExecutionLevel admin
Unicode True
InstallDir "$PROGRAMFILES64\##APP_NAME##"
InstallDirRegKey HKLM "Software\##APP_NAME##" "Install_Dir"
Icon "icon.ico"
LicenseData "LICENSE.txt"
LicenseForceSelection checkbox

Page license
Page components
Page directory
Page instfiles

UninstPage uninstConfirm
UninstPage instfiles

Section "Installation"
  SectionIn RO
  SetOutPath $INSTDIR
  File /r /x mk_setup.nsi *

  WriteRegStr HKLM "SOFTWARE\##APP_NAME##" "Install_Dir" "$INSTDIR"
  WriteRegStr HKLM "Software\Microsoft\Windows\CurrentVersion\Uninstall\##APP_NAME##" "DisplayName" "##APP_NAME##"
  WriteRegStr HKLM "Software\Microsoft\Windows\CurrentVersion\Uninstall\##APP_NAME##" "Publisher" "E-IS"
  WriteRegStr HKLM "Software\Microsoft\Windows\CurrentVersion\Uninstall\##APP_NAME##" "DisplayIcon" "$INSTDIR\icon.ico"
  WriteRegStr HKLM "Software\Microsoft\Windows\CurrentVersion\Uninstall\##APP_NAME##" "DisplayVersion" "##APP_VERSION##"
  WriteRegStr HKLM "Software\Microsoft\Windows\CurrentVersion\Uninstall\##APP_NAME##" "UninstallString" '"$INSTDIR\uninstall.exe"'
  WriteRegDWORD HKLM "Software\Microsoft\Windows\CurrentVersion\Uninstall\##APP_NAME##" "NoModify" 1
  WriteRegDWORD HKLM "Software\Microsoft\Windows\CurrentVersion\Uninstall\##APP_NAME##" "NoRepair" 1
  WriteUninstaller "$INSTDIR\uninstall.exe"
  ; WriteRegStr HKLM "Software\Microsoft\Windows\CurrentVersion\Uninstall\##APP_NAME##" "HelpLink" ""
  ; WriteRegStr HKLM "Software\Microsoft\Windows\CurrentVersion\Uninstall\##APP_NAME##" "UrlInfoAbout" ""
  ; WriteRegStr HKLM "Software\Microsoft\Windows\CurrentVersion\Uninstall\##APP_NAME##" "UrlUpdateInfo" ""

  ; Create icon in start menu
  CreateShortcut "$SMPROGRAMS\##APP_NAME##.lnk" "$INSTDIR\##APP_ID##.exe" parameters "$INSTDIR\icon.ico"
SectionEnd

Section "Raccourcis sur le bureau"
  CreateShortcut "$DESKTOP\##APP_NAME##.lnk" "$INSTDIR\##APP_ID##.exe" parameters "$INSTDIR\icon.ico"
SectionEnd

Section "Uninstall"
  ; Remove registry keys
  DeleteRegKey HKLM "Software\Microsoft\Windows\CurrentVersion\Uninstall\##APP_NAME##"
  DeleteRegKey HKLM "SOFTWARE\##APP_NAME##"

  RMDir /r $INSTDIR
  Delete "$SMPROGRAMS\##APP_NAME##.lnk"
  Delete "$DESKTOP\##APP_NAME##.lnk"
SectionEnd
