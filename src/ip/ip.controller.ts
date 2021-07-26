import { Controller, Post, Delete, Body } from '@nestjs/common';

class InsertIpDTO {}

@Controller('ip')
export class IpController {
  @Post()
  insertIp(@Body() insertIpDTO: InsertIpDTO) {
    return insertIpDTO;
  }

  @Delete()
  deleteIp() {
    return true;
  }
}
