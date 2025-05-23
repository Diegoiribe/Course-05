import { LogEntity, LogSeverityLevel } from '../../entities/log.entity'
import { LogRepository } from '../../repository/log.repository'

interface CheckServiceUseCase {
  execute(url: string): Promise<boolean>
}

type SuccessCallBack = (() => void) | undefined
type ErrorCallBack = ((error: string) => void) | undefined

export class CheckService implements CheckServiceUseCase {
  constructor(
    private readonly logRepository: LogRepository,
    private readonly successCallBack: SuccessCallBack,
    private readonly errorCallBack: ErrorCallBack
  ) {}

  public async execute(url: string): Promise<boolean> {
    try {
      const req = await fetch(url)
      if (!req.ok) {
        throw new Error(`Error on check service ${url}`)
      }

      const log = new LogEntity({
        message: `Server ${url} is okay`,
        level: LogSeverityLevel.low,
        origin: 'logs/log-all'
      })
      this.logRepository.saveLog(log)
      this.successCallBack && this.successCallBack()

      return true
    } catch (error) {
      const errorMessage = `${url} is not ok. ${error}`
      const log = new LogEntity({
        message: errorMessage,
        level: LogSeverityLevel.high,
        origin: 'logs/log-all'
      })
      this.logRepository.saveLog(log)
      this.errorCallBack && this.errorCallBack(`${error}`)

      return false
    }
  }
}
