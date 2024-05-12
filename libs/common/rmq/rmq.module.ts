import { DynamicModule, Module } from "@nestjs/common";
import { ClientsModule, Transport } from "@nestjs/microservices";
import { RmqService } from "./rmq.service";


@Module({
    providers: [RmqService],
    exports:[RmqService]
})
export class RmqModule {
    static register({name}):DynamicModule{
        return {
            module:RmqModule,
            imports:[
                ClientsModule.registerAsync([
                    {
                        name,
                        useFactory: () => ({
                            transport: Transport.RMQ,
                            options:{
                                urls :['amqp://guest:guest@localhost:5672'],
                                queue:name,
                            }
                        }),
                    }
                ])
            ],
            exports: [ClientsModule],
        }
    }
}