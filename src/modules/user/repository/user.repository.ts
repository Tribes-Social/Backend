import { ClassProvider, Injectable } from "@nestjs/common";
import {
	RepoCreateUserInput,
	RepoUser,
	UserRepositoryDefinition,
	UserRepositoryName,
} from "src/modules/user/repository/user.repository.types";
import { DataSource } from "typeorm";
import {UserRecord} from "src/core/infrastructure/entities/User";

@Injectable()
export class UserRepository implements UserRepositoryDefinition {
	constructor(private dataSource: DataSource) {}

	public static Provider(): ClassProvider<UserRepository> {
		return {
			provide: UserRepositoryName,
			useClass: UserRepository,
		};
	}

	async createUser({ username, password }: RepoCreateUserInput): Promise<RepoUser> {
		const userToSave = {
			profilePictureUrl: "url",
			displayName: "displayName",
			username: username,
			password: password,
			biography: "biography",
			createdAt: BigInt(15),
		}

		const savedUserRecord = await this.dataSource.getRepository(UserRecord).save(userToSave);

		const repoUser: RepoUser = {
			id: savedUserRecord.id,
			profilePictureUrl: savedUserRecord.profilePictureUrl,
			displayName: savedUserRecord.displayName,
			username: savedUserRecord.username,
			password: savedUserRecord.password,
			biography: savedUserRecord.biography,
			createdAt: savedUserRecord.createdAt,
		};

		return repoUser;
	}
}
