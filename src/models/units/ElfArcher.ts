import { Unit, UnitProps } from "./Unit";
import { UnitNames } from "../enums";
import { MassEnemyStrategy } from "../strategies/target/MassEnemyStrategy";
import { DamageStrategy } from "../strategies/action/DamageStrategy";
import { SingleTargetStrategy } from "../strategies/Range";
import image from "../../assets/elf_archer.png";

export class ElfArcher extends Unit {
    constructor(props: UnitProps) {
        super(props);
        this.healthPoints = 90;
        this.maxHealthPoints = 90;
        this.power = 45;
        this.initiative = 60;
        this.name = UnitNames.ELF_ARCHER;
        this.image = image;
        this.targetStrategy = new MassEnemyStrategy();
        this.rangeStrategy = new SingleTargetStrategy();
        this.actionStrategy = new DamageStrategy();
    }
}
