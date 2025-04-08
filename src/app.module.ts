import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './entities/user.entity';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { JwtStrategy } from './auth/strategy/jwt.strategy';
import { PhishingModule } from './phishing/phishing.module';
import { UsersAttemptsEntity } from './entities/user.attempts.entity';

@Module({
  imports: [ 
    ConfigModule.forRoot({
      isGlobal: true
    }),
    JwtModule.register({
      global: true,
      secret:  process.env.JWT_TOKEN,
      signOptions: { expiresIn: '15m' },
    }),
    TypeOrmModule.forRoot({
      type: 'mongodb',
      host: '127.0.0.1',
      port: 27017,
      database: 'PhishingDB',
      useUnifiedTopology: true,
      entities: [UserEntity, UsersAttemptsEntity],
      synchronize: true,
    }),
    UserModule,
    AuthModule,
    PhishingModule
  ],
  controllers: [],
  providers: [JwtStrategy ],
})
export class AppModule {}