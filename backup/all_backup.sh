# 全量备份脚本
#!/bin/bash
BACKUP_DIR="/var/backup/mysql"
TIMESTAMP=$(date +"%F")
BACKUP_FILE="$BACKUP_DIR/full_backup_$TIMESTAMP.sql"
mysqldump -u root -p 124789 ShortVideo > $BACKUP_FILE
