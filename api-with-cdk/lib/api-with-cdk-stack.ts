import * as cdk from '@aws-cdk/core';
import * as counter_service from '../lib/counter_service';

export class ApiWithCdkStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    new counter_service.CounterService(this, 'CounterApi');
  }
}
