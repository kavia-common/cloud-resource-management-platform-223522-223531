#!/bin/bash
cd /home/kavia/workspace/code-generation/cloud-resource-management-platform-223522-223531/react_frontend
npm run build
EXIT_CODE=$?
if [ $EXIT_CODE -ne 0 ]; then
   exit 1
fi

