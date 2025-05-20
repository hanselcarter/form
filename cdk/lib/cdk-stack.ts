import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as path from 'path';
import { Nextjs } from 'cdk-nextjs-standalone';

export class CdkStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);
    
    // Deploy Next.js app with full capabilities (SSR, API routes, etc.)
    const nextjs = new Nextjs(this, 'RidleyNextJsApp', {
      // Path to your Next.js project relative to the CDK app
      nextjsPath: path.join(__dirname, '../..'),
    });
    
    // Output the CloudFront URL
    new cdk.CfnOutput(this, 'CloudFrontDistributionDomain', {
      value: nextjs.distribution.distributionDomain,
      description: 'Next.js Website URL',
    });
  }
}
