<script lang="ts">
  import { Component, Prop, Vue, Watch } from 'vue-property-decorator'
  import { namespace } from 'vuex-class'
  import VueMarkdownWithAnchors from '@/components/VueMarkdownWithAnchors.vue'
  import Loading from '@/components/Loading.vue'

  const blobsModule = namespace('blobs')

  @Component({
    components: {
      VueMarkdownWithAnchors,
      Loading
    }
  })
  export default class HivesChapter extends Vue {
    @blobsModule.State hivesBlobs!: { [key: string]: string }
    @blobsModule.Action fetchHivesBlob!: (chapter: string) => void
    @Prop(String) readonly chapter!: string

    chapterMap: { [key: string]: string } = {
      introduction: 'Introduction',
      stepByStepFactions: 'Step-By-Step Factions',
      downtime: 'Entertainment and Downtime',
      factionsAndMembership: 'Factions and Membership',
      abilityScores: 'Using Ability Scores',
      equipment: 'Equipment',
      customizationOptions: 'Customization Options',
      enhancedItems: 'Enhanced Items',
      modifiableItems: 'Modifiable Items',
      toolProficiencies: 'Tool Proficiencies',
      changelog: 'Changelog'
    }

    created () {
      this.fetchHivesBlob(this.blobName)
    }

    @Watch('$route')
    fetchData () {
      this.fetchHivesBlob(this.blobName)
    }

    get title () {
        return (this.chapterMap[this.chapter] || 'Introduction') + ' | WH' + Vue.prototype.$titleSuffix
    }

    get blobName () {
      return this.chapterMap[this.chapter] || 'Introduction'
    }

    get blob () {
      const blob = this.hivesBlobs[this.blobName]
      return blob && blob.replace(/\ufffd/g, ' - ')
    }
  }
</script>

<template lang="pug">
  div
    vue-headful(:title="title")
    div(v-if="blob")
      VueMarkdownWithAnchors(:source="blob").text-left
      slot
    Loading(v-else)
</template>
