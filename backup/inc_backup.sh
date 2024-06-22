# 增量备份脚本
#!/bin/bash
BACKUP_DIR="/var/mysql"
BINLOG_DIR="/var/lib/mysql"
TIMESTAMP=$(date +"%F")
BACKUP_FILE="$BACKUP_DIR/incremental_backup_$TIMESTAMP.sql"
mysqlbinlog --start-datetime="2023-01-01 00:00:00" --stop-datetime="2023-01-01 23:59:59" $BINLOG_DIR/mysql-bin.000001 > $BACKUP_FILE
