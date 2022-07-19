import { Injectable } from "@nestjs/common";
import {
  uniqueNamesGenerator,
  Config,
  adjectives,
  colors,
  animals,
} from "unique-names-generator";

@Injectable()
export class GenerateRandomAliasService {
  constructor() {}

  async generate() {
    const config: Config = {
      dictionaries: [adjectives, colors, animals],
      length: 2,
      separator: "_",
    };

    const name = uniqueNamesGenerator(config);

    return name;
  }
}
