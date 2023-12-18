import { faker } from '@faker-js/faker'
import { CategoryBuilder } from '../../../modules/beer/domain/model/category'

export const makeCategory = () => new CategoryBuilder().withName(faker.name.firstName()).build()
