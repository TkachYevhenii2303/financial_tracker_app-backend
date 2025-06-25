import { Controller, Get } from '@nestjs/common';

@Controller()
export class AppController {
    @Get()
    getMainRoot(): string {
        return 'Financial Tracker API. \nPlease, use /api to access the documentation or choose root of the API';
    }
}

