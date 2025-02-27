import { Controller, Get, Param } from "@nestjs/common";
import { GatewayController } from "../GatewayController";
import { StandardResult } from "../../../../Result/Gateway/Proxy/StandardResult";
import { IProxyManager } from "../../../../IManager/Gateway/Proxy/IProxyManager";

@Controller("api")
export class ProxyController implements GatewayController {
  constructor(private readonly _proxyManager: IProxyManager) {}

  @Get(":definition/*route")
  async getAsync(
    @Param("definition") definition: string,
    @Param("route") route: string | string[]
  ): Promise<StandardResult<string>> {
    console.log("definition", definition);
    console.log("route", route);
    const fullPath = Array.isArray(route) ? route.join("/") : route;
    console.log("fullPath", route);
    return {
      data: await this._proxyManager.getAsync({
        definition: definition,
        route: fullPath,
      }),
      status: 200,
      errorMessages: null,
    };
  }
}
