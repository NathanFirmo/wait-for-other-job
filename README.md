<div align=center>

# Wait for other job

![Open Source Love](https://badges.frapsoft.com/os/mit/mit.svg?v=102)
![version](https://img.shields.io/github/package-json/v/NathanFirmo/wait-for-other-job)
![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)
[![test](https://github.com/NathanFirmo/wait-for-other-job/actions/workflows/test.yml/badge.svg)](https://github.com/NathanFirmo/wait-for-other-job/actions/workflows/test.yml)

This action provides a simple way to wait for a specific job (in current workflow) to complete.

</div>

## Usage

~~~yml
name: Wait 
uses: NathanFirmo/wait-for-other-job@v1
with:
  token: ${{ secrets.GITHUB_TOKEN }}
  job: 'job-name'
~~~

> OBS.: If you get an error in private repos, use a [Personal Access Token](https://docs.github.com/pt/authentication/keeping-your-account-and-data-secure/creating-a-personal-access-token) instead.

### Required Inputs
The following inputs are required to use this action:

| Input | Description |
| --- | --- |
| `token` | Your GitHub token. See more in [GitHub Docs](https://docs.github.com/en/actions/security-guides/automatic-token-authentication). |
| `job` | Name of the job you wanna wait for. |


### Optional Inputs
These are the optional inputs for this action:

| Input | Description |
| --- | --- |
| `failOnJobError` | If true, the action will fail case an error happen in the job you are waiting for. |


### Why use this action

This action can be useful you to decrease CI execution time helping to parallelize jobs like build, test and deployment.

![Now](https://user-images.githubusercontent.com/79997705/228352106-ea2b6d3e-a010-4a26-b886-35ab4444b4d9.jpg)



