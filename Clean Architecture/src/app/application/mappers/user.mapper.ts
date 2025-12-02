import { User } from '../../domain/models/user';
import { UserDTO } from '../dto/user.dto';

export class UserMapper {
    static toDomain(dto: UserDTO): User {
        return {
            id: dto.id,
            name: dto.name,
            email: dto.email,
            role: dto.role as any,
            createdAt: new Date(dto.created_at)
        };
    }

    static toDTO(domain: User): UserDTO {
        return {
            id: domain.id,
            name: domain.name,
            email: domain.email,
            role: domain.role,
            created_at: domain.createdAt.toISOString()
        };
    }
}
