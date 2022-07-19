import { Injectable } from "@nestjs/common";

@Injectable()
export class GenerateRandomAvatarService {
  constructor() {}

  private generateColor() {
    const letters = "0123456789ABCDEF";
    let color = "#";
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }

  async generate(name: string) {
    // Extract name from email
    const nameArray = name.split("@");
    const nameWithoutDomain = nameArray[0];
    const nameWithoutDomainArray = nameWithoutDomain.split(".");
    const nameWithoutDomainWithoutDot = nameWithoutDomainArray[0];

    // Convert name to http-friendly (replace spaces with %20)
    const nameHttpFriendly = nameWithoutDomainWithoutDot.replace(/ /g, "%20");

    // Generate random color (hex)
    const color = this.generateColor();

    return `http://165.232.185.26:5000/initials/${nameHttpFriendly}.png?s=200?bg=${color}`;
  }
}
