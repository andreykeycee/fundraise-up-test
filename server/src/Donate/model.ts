import { getModelForClass, prop } from '@typegoose/typegoose'

export class Donate {
  @prop()
  amount: number

  @prop()
  currency: string
}

export const DonateModel = getModelForClass(Donate, {
  schemaOptions: {
    timestamps: true,
    collection: 'donates'
  }
})