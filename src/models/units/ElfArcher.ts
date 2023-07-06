import { RangeUnit, DamageUnitProps } from "../base"
import { UnitNames } from "../enums";
import image from "../../assets/elf_archer.png"

export class ElfArcher extends RangeUnit {
    constructor(props: DamageUnitProps) {
        super(props);
        this.healthPoints = 90;
        this.maxHealthPoints = 90;
        this.damage = 45;
        this.initiative = 60;
        this.name = UnitNames.ELF_ARCHER
        this.image = image;
    }
}