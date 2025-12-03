import {
  Body,
  Controller,
  Post,
  Request,
  UseGuards,
  Get,
  Query,
  ParseIntPipe,
} from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt.guard';
import { BuyStockDto } from './dto/buy-stock.dto';
import { SellStockDto } from './dto/sell-stock.dto';
import { TradesService } from './trades.service';

@Controller('trades')
export class TradesController {
  constructor(private readonly tradesService: TradesService) {}

  @UseGuards(JwtAuthGuard)
  @Get('portfolio')
  getPortfolio(@Request() req) {
    const userId = req.user.userId;
    return this.tradesService.getPortfolio(userId);
  }

  @UseGuards(JwtAuthGuard)
  @Get('transactions')
  getTransactions(
    @Request() req,
    @Query('limit', new ParseIntPipe({ optional: true })) limit?: number,
    @Query('offset', new ParseIntPipe({ optional: true })) offset?: number,
  ) {
    const userId = req.user.userId;
    return this.tradesService.getTransactions(
      userId,
      limit || 50,
      offset || 0,
    );
  }

  @UseGuards(JwtAuthGuard)
  @Post('buy')
  buyStock(@Request() req, @Body() buyStockDto: BuyStockDto) {
    const userId = req.user.userId;
    const { symbol, quantity } = buyStockDto;
    return this.tradesService.buyStock(userId, symbol, quantity);
  }

  @UseGuards(JwtAuthGuard)
  @Post('sell')
  sellStock(@Request() req, @Body() sellStockDto: SellStockDto) {
    const userId = req.user.userId;
    const { symbol, quantity } = sellStockDto;
    return this.tradesService.sellStock(userId, symbol, quantity);
  }
}
