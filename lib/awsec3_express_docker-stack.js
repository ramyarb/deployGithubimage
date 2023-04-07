"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const cdk = require("@aws-cdk/core");
const ec2 = require("@aws-cdk/aws-ec2");
const ecs = require("@aws-cdk/aws-ecs");
const elbv2 = require("@aws-cdk/aws-elasticloadbalancingv2");
class Awsec3ExpressDockerStack extends cdk.Stack {
    constructor(scope, id, props) {
        super(scope, id, props);
        const vpc = new ec2.Vpc(this, "helloVpc", { maxAzs: 2 });
        // Create an ECS cluster
        var cluster = new ecs.Cluster(this, "Cluster", { vpc });
        cluster.addCapacity("DefaultAutoScalingGroup", {
            instanceType: new ec2.InstanceType("t2.micro"),
            maxCapacity: 3,
        });
        // hello service
        const helloTaskDefinition = new ecs.Ec2TaskDefinition(this, "hello-task-definition", {});
        const helloContainer = helloTaskDefinition.addContainer("hello", {
            image: ecs.ContainerImage.fromRegistry("jrwtango/c2express002"),
            memoryLimitMiB: 128,
        });
        helloContainer.addPortMappings({
            containerPort: 3000,
        });
        const helloService = new ecs.Ec2Service(this, "hello-service", {
            cluster: cluster,
            desiredCount: 3,
            taskDefinition: helloTaskDefinition,
        });
        // Internet facing load balancer for the frontend services
        const externalLB = new elbv2.ApplicationLoadBalancer(this, "external", {
            vpc: vpc,
            internetFacing: true,
        });
        const externalListener = externalLB.addListener("PublicListener", {
            port: 80,
            open: true,
        });
        externalListener.addTargets("greeter", {
            port: 80,
            targets: [helloService],
        });
        new cdk.CfnOutput(this, "ExternalDNS", {
            value: externalLB.loadBalancerDnsName,
        });
    }
}
exports.Awsec3ExpressDockerStack = Awsec3ExpressDockerStack;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXdzZWMzX2V4cHJlc3NfZG9ja2VyLXN0YWNrLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiYXdzZWMzX2V4cHJlc3NfZG9ja2VyLXN0YWNrLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEscUNBQXNDO0FBQ3RDLHdDQUF5QztBQUN6Qyx3Q0FBeUM7QUFDekMsNkRBQThEO0FBRTlELE1BQWEsd0JBQXlCLFNBQVEsR0FBRyxDQUFDLEtBQUs7SUFDckQsWUFBWSxLQUFjLEVBQUUsRUFBVSxFQUFFLEtBQXNCO1FBQzVELEtBQUssQ0FBQyxLQUFLLEVBQUUsRUFBRSxFQUFFLEtBQUssQ0FBQyxDQUFDO1FBRXhCLE1BQU0sR0FBRyxHQUFHLElBQUksR0FBRyxDQUFDLEdBQUcsQ0FBQyxJQUFJLEVBQUUsVUFBVSxFQUFFLEVBQUUsTUFBTSxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUM7UUFFekQsd0JBQXdCO1FBQ3hCLElBQUksT0FBTyxHQUFHLElBQUksR0FBRyxDQUFDLE9BQU8sQ0FBQyxJQUFJLEVBQUUsU0FBUyxFQUFFLEVBQUUsR0FBRyxFQUFFLENBQUMsQ0FBQztRQUN4RCxPQUFPLENBQUMsV0FBVyxDQUFDLHlCQUF5QixFQUFFO1lBQzdDLFlBQVksRUFBRSxJQUFJLEdBQUcsQ0FBQyxZQUFZLENBQUMsVUFBVSxDQUFDO1lBQzlDLFdBQVcsRUFBRSxDQUFDO1NBQ2YsQ0FBQyxDQUFDO1FBRUgsZ0JBQWdCO1FBQ2hCLE1BQU0sbUJBQW1CLEdBQUcsSUFBSSxHQUFHLENBQUMsaUJBQWlCLENBQ25ELElBQUksRUFDSix1QkFBdUIsRUFDdkIsRUFBRSxDQUNILENBQUM7UUFFRixNQUFNLGNBQWMsR0FBRyxtQkFBbUIsQ0FBQyxZQUFZLENBQUMsT0FBTyxFQUFFO1lBQy9ELEtBQUssRUFBRSxHQUFHLENBQUMsY0FBYyxDQUFDLFlBQVksQ0FBQyx1QkFBdUIsQ0FBQztZQUMvRCxjQUFjLEVBQUUsR0FBRztTQUNwQixDQUFDLENBQUM7UUFFSCxjQUFjLENBQUMsZUFBZSxDQUFDO1lBQzdCLGFBQWEsRUFBRSxJQUFJO1NBQ3BCLENBQUMsQ0FBQztRQUVILE1BQU0sWUFBWSxHQUFHLElBQUksR0FBRyxDQUFDLFVBQVUsQ0FBQyxJQUFJLEVBQUUsZUFBZSxFQUFFO1lBQzdELE9BQU8sRUFBRSxPQUFPO1lBQ2hCLFlBQVksRUFBRSxDQUFDO1lBQ2YsY0FBYyxFQUFFLG1CQUFtQjtTQUNwQyxDQUFDLENBQUM7UUFDSCwwREFBMEQ7UUFFMUQsTUFBTSxVQUFVLEdBQUcsSUFBSSxLQUFLLENBQUMsdUJBQXVCLENBQUMsSUFBSSxFQUFFLFVBQVUsRUFBRTtZQUNyRSxHQUFHLEVBQUUsR0FBRztZQUNSLGNBQWMsRUFBRSxJQUFJO1NBQ3JCLENBQUMsQ0FBQztRQUVILE1BQU0sZ0JBQWdCLEdBQUcsVUFBVSxDQUFDLFdBQVcsQ0FBQyxnQkFBZ0IsRUFBRTtZQUNoRSxJQUFJLEVBQUUsRUFBRTtZQUNSLElBQUksRUFBRSxJQUFJO1NBQ1gsQ0FBQyxDQUFDO1FBRUgsZ0JBQWdCLENBQUMsVUFBVSxDQUFDLFNBQVMsRUFBRTtZQUNyQyxJQUFJLEVBQUUsRUFBRTtZQUNSLE9BQU8sRUFBRSxDQUFDLFlBQVksQ0FBQztTQUN4QixDQUFDLENBQUM7UUFFSCxJQUFJLEdBQUcsQ0FBQyxTQUFTLENBQUMsSUFBSSxFQUFFLGFBQWEsRUFBRTtZQUNyQyxLQUFLLEVBQUUsVUFBVSxDQUFDLG1CQUFtQjtTQUN0QyxDQUFDLENBQUM7SUFDTCxDQUFDO0NBQ0Y7QUF2REQsNERBdURDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IGNkayA9IHJlcXVpcmUoXCJAYXdzLWNkay9jb3JlXCIpO1xuaW1wb3J0IGVjMiA9IHJlcXVpcmUoXCJAYXdzLWNkay9hd3MtZWMyXCIpO1xuaW1wb3J0IGVjcyA9IHJlcXVpcmUoXCJAYXdzLWNkay9hd3MtZWNzXCIpO1xuaW1wb3J0IGVsYnYyID0gcmVxdWlyZShcIkBhd3MtY2RrL2F3cy1lbGFzdGljbG9hZGJhbGFuY2luZ3YyXCIpO1xuXG5leHBvcnQgY2xhc3MgQXdzZWMzRXhwcmVzc0RvY2tlclN0YWNrIGV4dGVuZHMgY2RrLlN0YWNrIHtcbiAgY29uc3RydWN0b3Ioc2NvcGU6IGNkay5BcHAsIGlkOiBzdHJpbmcsIHByb3BzPzogY2RrLlN0YWNrUHJvcHMpIHtcbiAgICBzdXBlcihzY29wZSwgaWQsIHByb3BzKTtcblxuICAgIGNvbnN0IHZwYyA9IG5ldyBlYzIuVnBjKHRoaXMsIFwiaGVsbG9WcGNcIiwgeyBtYXhBenM6IDIgfSk7XG5cbiAgICAvLyBDcmVhdGUgYW4gRUNTIGNsdXN0ZXJcbiAgICB2YXIgY2x1c3RlciA9IG5ldyBlY3MuQ2x1c3Rlcih0aGlzLCBcIkNsdXN0ZXJcIiwgeyB2cGMgfSk7XG4gICAgY2x1c3Rlci5hZGRDYXBhY2l0eShcIkRlZmF1bHRBdXRvU2NhbGluZ0dyb3VwXCIsIHtcbiAgICAgIGluc3RhbmNlVHlwZTogbmV3IGVjMi5JbnN0YW5jZVR5cGUoXCJ0Mi5taWNyb1wiKSxcbiAgICAgIG1heENhcGFjaXR5OiAzLFxuICAgIH0pO1xuXG4gICAgLy8gaGVsbG8gc2VydmljZVxuICAgIGNvbnN0IGhlbGxvVGFza0RlZmluaXRpb24gPSBuZXcgZWNzLkVjMlRhc2tEZWZpbml0aW9uKFxuICAgICAgdGhpcyxcbiAgICAgIFwiaGVsbG8tdGFzay1kZWZpbml0aW9uXCIsXG4gICAgICB7fVxuICAgICk7XG5cbiAgICBjb25zdCBoZWxsb0NvbnRhaW5lciA9IGhlbGxvVGFza0RlZmluaXRpb24uYWRkQ29udGFpbmVyKFwiaGVsbG9cIiwge1xuICAgICAgaW1hZ2U6IGVjcy5Db250YWluZXJJbWFnZS5mcm9tUmVnaXN0cnkoXCJqcnd0YW5nby9jMmV4cHJlc3MwMDJcIiksXG4gICAgICBtZW1vcnlMaW1pdE1pQjogMTI4LFxuICAgIH0pO1xuXG4gICAgaGVsbG9Db250YWluZXIuYWRkUG9ydE1hcHBpbmdzKHtcbiAgICAgIGNvbnRhaW5lclBvcnQ6IDMwMDAsXG4gICAgfSk7XG5cbiAgICBjb25zdCBoZWxsb1NlcnZpY2UgPSBuZXcgZWNzLkVjMlNlcnZpY2UodGhpcywgXCJoZWxsby1zZXJ2aWNlXCIsIHtcbiAgICAgIGNsdXN0ZXI6IGNsdXN0ZXIsXG4gICAgICBkZXNpcmVkQ291bnQ6IDMsXG4gICAgICB0YXNrRGVmaW5pdGlvbjogaGVsbG9UYXNrRGVmaW5pdGlvbixcbiAgICB9KTtcbiAgICAvLyBJbnRlcm5ldCBmYWNpbmcgbG9hZCBiYWxhbmNlciBmb3IgdGhlIGZyb250ZW5kIHNlcnZpY2VzXG5cbiAgICBjb25zdCBleHRlcm5hbExCID0gbmV3IGVsYnYyLkFwcGxpY2F0aW9uTG9hZEJhbGFuY2VyKHRoaXMsIFwiZXh0ZXJuYWxcIiwge1xuICAgICAgdnBjOiB2cGMsXG4gICAgICBpbnRlcm5ldEZhY2luZzogdHJ1ZSxcbiAgICB9KTtcblxuICAgIGNvbnN0IGV4dGVybmFsTGlzdGVuZXIgPSBleHRlcm5hbExCLmFkZExpc3RlbmVyKFwiUHVibGljTGlzdGVuZXJcIiwge1xuICAgICAgcG9ydDogODAsXG4gICAgICBvcGVuOiB0cnVlLFxuICAgIH0pO1xuXG4gICAgZXh0ZXJuYWxMaXN0ZW5lci5hZGRUYXJnZXRzKFwiZ3JlZXRlclwiLCB7XG4gICAgICBwb3J0OiA4MCxcbiAgICAgIHRhcmdldHM6IFtoZWxsb1NlcnZpY2VdLFxuICAgIH0pO1xuXG4gICAgbmV3IGNkay5DZm5PdXRwdXQodGhpcywgXCJFeHRlcm5hbEROU1wiLCB7XG4gICAgICB2YWx1ZTogZXh0ZXJuYWxMQi5sb2FkQmFsYW5jZXJEbnNOYW1lLFxuICAgIH0pO1xuICB9XG59XG4iXX0=