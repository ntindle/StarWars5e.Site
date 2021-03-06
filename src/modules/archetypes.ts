import fetchFromCache from '@/utilities/fetchFromCache'
import { Module, VuexModule, MutationAction } from 'vuex-module-decorators'
import { ArchetypeType } from '@/types/characterTypes'

@Module({ namespaced: true, name: 'archetypes' })
export default class Archetypes extends VuexModule {
  archetypes: ArchetypeType[] = []
  cachedVersion: number = 0

  @MutationAction({ mutate: ['archetypes', 'cachedVersion'] })
  async fetchArchetypes () {
    const { data: archetypes, cachedVersion } = await fetchFromCache(this, 'archetypes', 'archetype')
    return { archetypes, cachedVersion }
  }
}
