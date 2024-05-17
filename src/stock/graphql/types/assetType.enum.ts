import { registerEnumType } from '@nestjs/graphql'

export enum AssetType {
  ETF = 'ETF',
  CommonStock = 'Common Stock'
}

registerEnumType(AssetType, {
  name: 'AssetType',
  valuesMap: {
    CommonStock: {
      description: 'Common stock represents your residual ownership stake in a business entity'
    },
    ETF: {
      description: 'Exchange-traded funds'
    }
  }
})
