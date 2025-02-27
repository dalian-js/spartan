import type { ExecutorContext } from '@nx/devkit';
import { execSync } from 'node:child_process';

import { getRoot } from '../helpers/projects.helpers';

import * as process from 'node:process';
import type { NpmPublishExecutorSchema } from './schema';

export default async function runExecutor(_options: NpmPublishExecutorSchema, context: ExecutorContext) {
	const tag = process.env.TAG;

	if (!tag) {
		console.log('no process.env.TAG available. returning early');
		return {
			success: false,
		};
	}

	const sourceRoot = `./dist/${getRoot(context)}`;

	console.log('running npm publish at ' + sourceRoot);

	execSync(`cd ${sourceRoot} && npm publish${tag ? ` --tag ${tag}` : ''}`);
	return {
		success: true,
	};
}
