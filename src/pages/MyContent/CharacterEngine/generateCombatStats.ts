import { RawCharacterType } from '@/types/rawCharacterTypes'

export default function generateCombatStats (rawCharacter: RawCharacterType) {
  // Requires dex and perception from generateAbilityScores.ts
  // Requires AC and bonuses of equipped items from generateEquipment.ts
  return {
    proficiencyBonus: 3,
    initiative: 4,
    armorClass: 19,
    passivePerception: 9,
    inspiration: false,
    vision: 'normal',
    speed: {
      base: '30ft',
      hour: '3 miles',
      day: '24 miles',
      special: ''
    }
  }
}
