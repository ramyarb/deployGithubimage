#!/usr/bin/env node
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("source-map-support/register");
const cdk = require("@aws-cdk/core");
const awsec3_express_docker_stack_1 = require("../lib/awsec3_express_docker-stack");
const app = new cdk.App();
const envUSA = { account: '048416854569', region: 'us-east-1' };
new awsec3_express_docker_stack_1.Awsec3ExpressDockerStack(app, 'Awsec3ExpressDockerStack', { env: envUSA });
app.synth();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXdzZWMzX2V4cHJlc3NfZG9ja2VyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiYXdzZWMzX2V4cHJlc3NfZG9ja2VyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUNBLHVDQUFxQztBQUNyQyxxQ0FBc0M7QUFDdEMsb0ZBQThFO0FBRTlFLE1BQU0sR0FBRyxHQUFHLElBQUksR0FBRyxDQUFDLEdBQUcsRUFBRSxDQUFDO0FBQzFCLE1BQU0sTUFBTSxHQUFHLEVBQUUsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLEVBQUUsV0FBVyxFQUFFLENBQUM7QUFFaEUsSUFBSSxzREFBd0IsQ0FBQyxHQUFHLEVBQUUsMEJBQTBCLEVBQUMsRUFBQyxHQUFHLEVBQUUsTUFBTSxFQUFDLENBQUUsQ0FBQztBQUM3RSxHQUFHLENBQUMsS0FBSyxFQUFFLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyIjIS91c3IvYmluL2VudiBub2RlXG5pbXBvcnQgJ3NvdXJjZS1tYXAtc3VwcG9ydC9yZWdpc3Rlcic7XG5pbXBvcnQgY2RrID0gcmVxdWlyZSgnQGF3cy1jZGsvY29yZScpO1xuaW1wb3J0IHsgQXdzZWMzRXhwcmVzc0RvY2tlclN0YWNrIH0gZnJvbSAnLi4vbGliL2F3c2VjM19leHByZXNzX2RvY2tlci1zdGFjayc7XG5cbmNvbnN0IGFwcCA9IG5ldyBjZGsuQXBwKCk7XG5jb25zdCBlbnZVU0EgPSB7IGFjY291bnQ6ICcwNDg0MTY4NTQ1NjknLCByZWdpb246ICd1cy1lYXN0LTEnIH07XG5cbm5ldyBBd3NlYzNFeHByZXNzRG9ja2VyU3RhY2soYXBwLCAnQXdzZWMzRXhwcmVzc0RvY2tlclN0YWNrJyx7ZW52OiBlbnZVU0F9ICk7XG5hcHAuc3ludGgoKTtcbiJdfQ==