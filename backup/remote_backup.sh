# 上传到AWS S3的脚本
#!/bin/bash
BACKUP_DIR="/var/backup/mysql"
AWS_BUCKET="s3://my-backup-bucket"
aws s3 cp $BACKUP_DIR $AWS_BUCKET --recursive
