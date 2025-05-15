import { CheckService } from '../domain/use-cases/checks/check-services'
import { SendEmailLogs } from '../domain/use-cases/email/send-email-logs'
import { FileSystemData } from '../infrastructure/data/file-system.data'
import { LogRepositoryImpl } from '../infrastructure/repositories/log.repository.impl'
import { CronService } from './cron/cron-service'
import { EmailService } from './email/email.service'

const fileSystemLogRepository = new LogRepositoryImpl(new FileSystemData())
const emailService = new EmailService()

export class Server {
  public static start() {
    console.log('Server started...')

    // Mandar logs por correo
    // new SendEmailLogs(emailService, fileSystemLogRepository).execute([
    //   'dieguill0@outlook.com',
    //   'diego.iribe@outlook.es'
    // ])

    // Guardar logs en el sistema de archivos
    // const emailService = new EmailService(fileSystemLogRepository)
    // emailService.sendEmailWithFileSystemLogs([
    //   'dieguill0@outlook.com',
    //   'diego.iribe@outlook.es'
    // ])

    // Mandar correos
    // const emailService = new EmailService()
    // emailService.sendEmailWithFileSystemLogs([
    //   'dieguill0@outlook.com',
    //   'diego.iribe@outlook.es'
    // ])

    // Checar el estado de un servidor cada 5 segundos
    // CronService.createJob('*/5 * * * * *', () => {
    //   const url = 'https://www.google.com'

    //   new CheckService(
    //     fileSystemLogRepository,
    //     () => console.log(`${url} is ok`),
    //     (error) => console.log(`Error: ${error}`)
    //   ).execute(url)
    // })
  }
}
