import { Extra } from 'telegraf';
import dispButtons from './helpers/general/dispButtons';

const markdown = Extra.markdown();

export const helpMsg = () => [
  `sfida - Inizia una nuova partita
  aiuto - Info sui possibili comandi
  privacy - Info sulla privacy
  info - Info sul bot
  come - Come giocare a Cirulla
  esci - Esci dal gioco`
];
export const privacyMsg = () => [
  `Info privacy per @cirullinoBot
Questo bot *salva* solamente:
 - il tuo username
 - il tuo nome
Questo bot *non salva*:
- il tuo numero di telefono
- il tuo cognome
- la tua mail`
];
export const aboutMsg = () => [
  `Questo bot è stato sviluppato da Gabriele Filaferro.
  gabriele.filaferro@gmail.com`,
  markdown
];
export const tutorialMsg = () => [
  `Per sapere come si gioca vai a questo [link](http://www.regoledelgioco.com/giochi-di-carte/cirulla/)`,
  { ...markdown, ...Extra.webPreview(false) }
];
export const alreadyPlayingMsg = () => [
  `Stai già giocando con qualcuno, usa /exit per uscire dal gioco corrente`,
  markdown
];
export const errorMsg = () => [
  `Scusami c'è un errore, riprova più tardi`,
  markdown
];

export const infoMsg = () => ``;
export const askANumberMsg = () => [
  `Dimmi un numero tra 1 e 3`,
  dispButtons(['1', '2', '3'])
];
export const notANumberMsg = () => [
  `Devi dirmi un numero tra 1 e 3`,
  dispButtons(['1', '2', '3'])
];
export const notOwnUsername = () => [
  'Il tuo username è già compreso, dimmi gli altri giocatori'
];
export const askUsername = oppNumber => [
  `Dimmi lo username del giocatore ${oppNumber}`
];
// TODO add link for bot
export const notStartedBotMsg = user => [
  `Mi dispiace ma ${user} non ha avviato cirullino, inviagli questo link ...`,
  { ...markdown, ...Extra.webPreview(false) }
];
export const userAlreadyPlayingMsg = user => [
  `Mi dispiace ma ${user} sta già giocando, chiedigli di ternimare il gioco`
];
export const notInvitedMsg = () => [``];
export const inviteReqMsg = () => [``];
export const stillSomeoneToAcceptMsg = () => [``];
export const notPlayingMsg = () => [``];
export const userNotActiveMsg = () => [``];
