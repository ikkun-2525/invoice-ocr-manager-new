# Cursorのチャット履歴を保存するPowerShellスクリプト
$date = Get-Date -Format "yyyy-MM-dd_HH-mm"
$chatHistoryDir = "$env:USERPROFILE\Documents\CursorChatHistory"
$chatHistoryFile = "$chatHistoryDir\chat_history_$date.md"

# 保存ディレクトリが存在しない場合は作成
if (!(Test-Path -Path $chatHistoryDir)) {
    New-Item -ItemType Directory -Path $chatHistoryDir
    Write-Output "ディレクトリを作成しました: $chatHistoryDir"
}

# Cursorのデータディレクトリ
$cursorDataDir = "$env:APPDATA\Cursor"
$localStateFile = "$cursorDataDir\Local State"

# Cursorが実行中かどうかを確認
$cursorProcess = Get-Process -Name "Cursor" -ErrorAction SilentlyContinue
if ($cursorProcess) {
    Write-Output "警告: Cursorが実行中です。チャット履歴が完全にエクスポートされない可能性があります。"
}

# チャット履歴をエクスポート（方法1: ファイルコピー）
$sessionStorageDir = "$cursorDataDir\Session Storage"
if (Test-Path -Path $sessionStorageDir) {
    $backupDir = "$chatHistoryDir\SessionStorage_$date"
    New-Item -ItemType Directory -Path $backupDir -Force | Out-Null
    Copy-Item -Path "$sessionStorageDir\*" -Destination $backupDir -Recurse -Force
    Write-Output "セッションストレージを $backupDir にバックアップしました"
}

# チャット履歴をエクスポート（方法2: Local Stateファイル）
if (Test-Path -Path $localStateFile) {
    Copy-Item -Path $localStateFile -Destination "$chatHistoryDir\LocalState_$date.json" -Force
    Write-Output "Local Stateファイルを $chatHistoryDir\LocalState_$date.json にバックアップしました"
}

# チャット履歴をエクスポート（方法3: IndexedDBフォルダ）
$indexedDBDir = "$cursorDataDir\IndexedDB"
if (Test-Path -Path $indexedDBDir) {
    $backupDir = "$chatHistoryDir\IndexedDB_$date"
    New-Item -ItemType Directory -Path $backupDir -Force | Out-Null
    Copy-Item -Path "$indexedDBDir\*" -Destination $backupDir -Recurse -Force
    Write-Output "IndexedDBを $backupDir にバックアップしました"
}

Write-Output "チャット履歴のバックアップが完了しました。保存先: $chatHistoryDir"
Write-Output "注意: このスクリプトはCursorの内部ファイル構造に依存しているため、Cursorのアップデートによって動作しなくなる可能性があります。" 