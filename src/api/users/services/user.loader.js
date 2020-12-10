import DataLoader from 'dataloader'


export const idLoader = () => {
  return new DataLoader(async projectIds => {
    return projectIds.map(projectId => projectId.toString())
  })
}

