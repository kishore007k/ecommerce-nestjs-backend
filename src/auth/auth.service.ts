import { Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { UserService } from "src/user/user.service";
import * as bcrypt from "bcrypt";
import { CustomError } from "src/dto/custom-error.dto";
import { User } from "src/dto/object-type/user.dto";
import { UserPass } from "src/dto/object-type/user-with-pass.dto";

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  validateUser = async (
    email: string,
    pass: string,
  ): Promise<UserPass | CustomError> => {
    try {
      const user = await this.usersService.findOne(email);

      if (user instanceof CustomError) {
        return user;
      }

      // Hash incoming password and compare with hashed password in database
      const isPasswordValid = await bcrypt.compare(pass, user.password);

      if (!isPasswordValid) {
        return {
          message: "Invalid credentials",
          statusCode: 401,
        };
      }

      const { password, ...result } = user;
      return result;
    } catch (error) {
      return {
        message: error.message,
        statusCode: error.statusCode,
      };
    }
  };

  signup = async (email: string, password: string, cPassword: string) => {
    if (password !== cPassword) {
      return {
        message: "Passwords do not match",
        statusCode: 400,
      };
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hashSync(password, salt);

    const user: User | CustomError = await this.usersService.createUser({
      email,
      password: hashedPassword,
      salt,
    });

    if (user instanceof CustomError) {
      return {
        message: "User already exists",
        statusCode: 401,
      };
    }

    return {
      message: "User created successfully",
      statusCode: 201,
    };
  };

  login = async (email: string, password: string) => {
    const isVerified = await this.validateUser(email, password);

    if (isVerified instanceof CustomError) {
      return {
        message: "Invalid credentials",
        statusCode: 401,
      };
    }

    const payload = { email: email, sub: isVerified.id, role: isVerified.role };

    // Create Access Token and Refresh Token
    const accessToken = this.jwtService.sign(payload);
    const refreshToken = this.jwtService.sign(payload);

    // Update Refresh token to User in database
    await this.usersService.updateRefreshToken(isVerified.id, refreshToken);

    return { user: isVerified, token: accessToken };
  };
}
