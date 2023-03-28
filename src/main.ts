import * as core from '@actions/core'
import * as github from '@actions/github'
import { Octokit } from '@octokit/rest'

async function run(): Promise<void> {
  const job: string = core.getInput('job', {
    required: true,
    trimWhitespace: true
  })

  const failOnJobError: boolean = core.getBooleanInput('failOnJobError', {
    required: false
  })

  try {
    core.info(`Waiting until ${job} finish`)

    let jobToWait = await getStatusOfJob(job)

    while (jobToWait?.status === 'in_progress') {
      await new Promise(resolve => setTimeout(resolve, 3000))
      jobToWait = await getStatusOfJob(job)
    }

    if (jobToWait?.conclusion === 'failure' && failOnJobError) {
      throw new Error(`The job ${job} have failed`)
    }
  } catch (error) {
    if (error instanceof Error) {
      if (error.message === 'Not Found') {
        core.error(
          `It seems the job "${job}" doesn't exist in current repo. Are this filename correct?`
        )
      }
      core.setFailed(error.message)
    }
  }
}

run()

async function getStatusOfJob(jobName: string) {
  const token: string = core.getInput('token', {
    required: true,
    trimWhitespace: true
  })

  const { context } = github

  const octokit = new Octokit({
    auth: token
  })

  const {
    data: { jobs }
  } = await octokit.actions.listJobsForWorkflowRunAttempt({
    owner: context.repo.owner,
    repo: context.repo.repo,
    run_id: context.runId,
    attempt_number: context.runNumber
  })

  const jobToWait = jobs.find(job => job.name === jobName)
  return jobToWait
}
