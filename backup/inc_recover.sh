# 增量备份恢复脚本
#!/bin/bash
FULL_BACKUP_FILE="/var/backup/mysql/full_backup.sql"
INCREMENTAL_BACKUP_DIR="/var/backup/mysql"
mysql -u root -p 124789 ShortVideo < $FULL_BACKUP_FILE
for INCREMENTAL_BACKUP_FILE in $INCREMENTAL_BACKUP_DIR/incremental_backup_*.sql
do
  mysql -u root -p 124789 ShortVideo < $INCREMENTAL_BACKUP_FILE
done
