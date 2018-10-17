import Octokit from '@octokit/rest'

import { GitHubActivityType } from '../../types'

export const octokit = new Octokit()

export function authenticate(token: string) {
  try {
    if (!token) {
      octokit.authenticate(null as any)
      return false
    }

    octokit.authenticate({
      type: 'oauth',
      token,
    })

    return true
  } catch (e) {
    return false
  }
}

export function getActivity<T extends GitHubActivityType>(
  type: T,
  params: any,
) {
  switch (type) {
    case 'ORG_PUBLIC_EVENTS':
      return octokit.activity.getEventsForOrg(params)
    case 'PUBLIC_EVENTS':
      return octokit.activity.getEvents(params)
    case 'REPO_EVENTS':
      return octokit.activity.getEventsForRepo(params)
    case 'REPO_NETWORK_EVENTS':
      return octokit.activity.getEventsForRepoNetwork(params)
    case 'USER_EVENTS':
      return octokit.activity.getEventsForUser(params)
    case 'USER_ORG_EVENTS':
      return octokit.activity.getEventsForUserOrg(params)
    case 'USER_PUBLIC_EVENTS':
      return octokit.activity.getEventsForUserPublic(params)
    case 'USER_RECEIVED_EVENTS':
      return octokit.activity.getEventsReceived(params)
    case 'USER_RECEIVED_PUBLIC_EVENTS':
      return octokit.activity.getEventsReceivedPublic(params)
    default:
      throw new Error(`No api method configured for activity type '${type}'.`)
  }
}
