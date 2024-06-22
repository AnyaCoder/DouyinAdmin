# 全量备份恢复脚本
#!/bin/bash
BACKUP_FILE="/var/backup/mysql/full_backup.sql"
mysql -u root -p 124789 ShortVideo < $BACKUP_FILE
