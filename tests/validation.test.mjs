import test from 'node:test';
import assert from 'node:assert/strict';
import { registerSchema, loginSchema, jobSchema, descriptionSchema, reviewStatusSchema } from '../utils/schemas.ts';

test('public registration allows only employer and housemaid roles', () => {
  const valid = { name: 'Test Person', email: 'Test@Example.com', password: 'verysecurepassword', role: 'employer' };
  assert.equal(registerSchema.safeParse(valid).success, true);
  assert.equal(registerSchema.safeParse({ ...valid, role: 'housemaid' }).success, true);
  assert.equal(registerSchema.safeParse({ ...valid, role: 'admin' }).success, false);
});

test('registration normalizes email and rejects short passwords', () => {
  const valid = { name: 'Test Person', email: 'TEST@EXAMPLE.COM', password: 'verysecurepassword', role: 'employer' };
  assert.equal(registerSchema.parse(valid).email, 'test@example.com');
  assert.equal(registerSchema.safeParse({ ...valid, password: '123' }).success, false);
});

test('job listing requires valid salary and sufficient details', () => {
  const valid = { title: 'Full time helper', location: 'Dhaka', salary: '12500', description: 'A role that helps with daily chores.' };
  assert.equal(jobSchema.parse(valid).salary, 12500);
  assert.equal(jobSchema.safeParse({ ...valid, salary: -100 }).success, false);
  assert.equal(jobSchema.safeParse({ ...valid, description: 'Too short' }).success, false);
});

test('description and status schemas reject unsafe submissions', () => {
  assert.equal(descriptionSchema.safeParse({ description: 'short' }).success, false);
  assert.equal(reviewStatusSchema.safeParse({ status: 'Admin' }).success, false);
  assert.equal(reviewStatusSchema.safeParse({ status: 'Pending' }).success, false);
  assert.equal(reviewStatusSchema.safeParse({ status: 'Approved' }).success, true);
  assert.equal(loginSchema.safeParse({ email: 'not-email', password: 'pass' }).success, false);
});
