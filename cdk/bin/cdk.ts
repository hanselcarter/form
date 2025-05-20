#!/usr/bin/env node
import * as cdk from 'aws-cdk-lib';
import { CdkStack } from '../lib/cdk-stack';

const app = new cdk.App();
new CdkStack(app, 'RidleyFrontendStack', {
  // Use the us-east-2 region which we configured with AWS CLI
  env: { region: 'us-east-2' },
  
  // Add stack tags (optional)
  tags: {
    Project: 'Ridley',
    Environment: 'Dev',
  },
});