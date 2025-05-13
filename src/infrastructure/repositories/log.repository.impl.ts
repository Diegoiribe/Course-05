import { LogData } from '../../domain/data/log.data'
import { LogEntity, LogSeverityLevel } from '../../domain/entities/log.entity'
import { LogRepository } from '../../domain/repository/log.repository'

export class LogRepositoryImpl implements LogRepository {
  constructor(private readonly logData: LogData) {}

  async saveLog(log: LogEntity): Promise<void> {
    return this.logData.saveLog(log)
  }
  async getLogs(severityLevel: LogSeverityLevel): Promise<LogEntity[]> {
    return this.logData.getLogs(severityLevel)
  }
}
