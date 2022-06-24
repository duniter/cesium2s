// Auto-generated via `yarn polkadot-types-from-chain`, do not edit
/* eslint-disable */

import type { ApiTypes } from '@polkadot/api-base/types';

declare module '@polkadot/api-base/types/errors' {
  export interface AugmentedErrors<ApiType extends ApiTypes> {
    atomicSwap: {
      /**
       * Swap has already been claimed.
       **/
      AlreadyClaimed: AugmentedError<ApiType>;
      /**
       * Swap already exists.
       **/
      AlreadyExist: AugmentedError<ApiType>;
      /**
       * Claim action mismatch.
       **/
      ClaimActionMismatch: AugmentedError<ApiType>;
      /**
       * Duration has not yet passed for the swap to be cancelled.
       **/
      DurationNotPassed: AugmentedError<ApiType>;
      /**
       * Swap proof is invalid.
       **/
      InvalidProof: AugmentedError<ApiType>;
      /**
       * Swap does not exist.
       **/
      NotExist: AugmentedError<ApiType>;
      /**
       * Proof is too large.
       **/
      ProofTooLarge: AugmentedError<ApiType>;
      /**
       * Source does not match.
       **/
      SourceMismatch: AugmentedError<ApiType>;
      /**
       * Generic error
       **/
      [key: string]: AugmentedError<ApiType>;
    };
    authorityMembers: {
      /**
       * Already incoming
       **/
      AlreadyIncoming: AugmentedError<ApiType>;
      /**
       * Already online
       **/
      AlreadyOnline: AugmentedError<ApiType>;
      /**
       * Already outgoing
       **/
      AlreadyOutgoing: AugmentedError<ApiType>;
      /**
       * Not found owner key
       **/
      MemberIdNotFound: AugmentedError<ApiType>;
      /**
       * Member not found
       **/
      MemberNotFound: AugmentedError<ApiType>;
      /**
       * Not member
       **/
      NotMember: AugmentedError<ApiType>;
      /**
       * Neither online nor scheduled
       **/
      NotOnlineNorIncoming: AugmentedError<ApiType>;
      /**
       * Not owner
       **/
      NotOwner: AugmentedError<ApiType>;
      /**
       * Session keys not provided
       **/
      SessionKeysNotProvided: AugmentedError<ApiType>;
      /**
       * Too man aAuthorities
       **/
      TooManyAuthorities: AugmentedError<ApiType>;
      /**
       * Generic error
       **/
      [key: string]: AugmentedError<ApiType>;
    };
    authorship: {
      /**
       * The uncle is genesis.
       **/
      GenesisUncle: AugmentedError<ApiType>;
      /**
       * The uncle parent not in the chain.
       **/
      InvalidUncleParent: AugmentedError<ApiType>;
      /**
       * The uncle isn't recent enough to be included.
       **/
      OldUncle: AugmentedError<ApiType>;
      /**
       * The uncle is too high in chain.
       **/
      TooHighUncle: AugmentedError<ApiType>;
      /**
       * Too many uncles.
       **/
      TooManyUncles: AugmentedError<ApiType>;
      /**
       * The uncle is already included.
       **/
      UncleAlreadyIncluded: AugmentedError<ApiType>;
      /**
       * Uncles already set in the block.
       **/
      UnclesAlreadySet: AugmentedError<ApiType>;
      /**
       * Generic error
       **/
      [key: string]: AugmentedError<ApiType>;
    };
    babe: {
      /**
       * A given equivocation report is valid but already previously reported.
       **/
      DuplicateOffenceReport: AugmentedError<ApiType>;
      /**
       * An equivocation proof provided as part of an equivocation report is invalid.
       **/
      InvalidEquivocationProof: AugmentedError<ApiType>;
      /**
       * A key ownership proof provided as part of an equivocation report is invalid.
       **/
      InvalidKeyOwnershipProof: AugmentedError<ApiType>;
      /**
       * Generic error
       **/
      [key: string]: AugmentedError<ApiType>;
    };
    balances: {
      /**
       * Beneficiary account must pre-exist
       **/
      DeadAccount: AugmentedError<ApiType>;
      /**
       * Value too low to create account due to existential deposit
       **/
      ExistentialDeposit: AugmentedError<ApiType>;
      /**
       * A vesting schedule already exists for this account
       **/
      ExistingVestingSchedule: AugmentedError<ApiType>;
      /**
       * Balance too low to send value
       **/
      InsufficientBalance: AugmentedError<ApiType>;
      /**
       * Transfer/payment would kill account
       **/
      KeepAlive: AugmentedError<ApiType>;
      /**
       * Account liquidity restrictions prevent withdrawal
       **/
      LiquidityRestrictions: AugmentedError<ApiType>;
      /**
       * Number of named reserves exceed MaxReserves
       **/
      TooManyReserves: AugmentedError<ApiType>;
      /**
       * Vesting balance too high to send value
       **/
      VestingBalance: AugmentedError<ApiType>;
      /**
       * Generic error
       **/
      [key: string]: AugmentedError<ApiType>;
    };
    cert: {
      /**
       * An identity cannot certify itself
       **/
      CannotCertifySelf: AugmentedError<ApiType>;
      /**
       * Certification non autorisée
       **/
      CertNotAllowed: AugmentedError<ApiType>;
      /**
       * An identity must receive certifications before it can issue them.
       **/
      IdtyMustReceiveCertsBeforeCanIssue: AugmentedError<ApiType>;
      /**
       * This identity has already issued the maximum number of certifications
       **/
      IssuedTooManyCert: AugmentedError<ApiType>;
      /**
       * Issuer not found
       **/
      IssuerNotFound: AugmentedError<ApiType>;
      /**
       * Not enough certifications received
       **/
      NotEnoughCertReceived: AugmentedError<ApiType>;
      /**
       * This identity has already issued a certification too recently
       **/
      NotRespectCertPeriod: AugmentedError<ApiType>;
      /**
       * This certification has already been issued or renewed recently
       **/
      NotRespectRenewablePeriod: AugmentedError<ApiType>;
      /**
       * Receiver not found
       **/
      ReceiverNotFound: AugmentedError<ApiType>;
      /**
       * Generic error
       **/
      [key: string]: AugmentedError<ApiType>;
    };
    grandpa: {
      /**
       * Attempt to signal GRANDPA change with one already pending.
       **/
      ChangePending: AugmentedError<ApiType>;
      /**
       * A given equivocation report is valid but already previously reported.
       **/
      DuplicateOffenceReport: AugmentedError<ApiType>;
      /**
       * An equivocation proof provided as part of an equivocation report is invalid.
       **/
      InvalidEquivocationProof: AugmentedError<ApiType>;
      /**
       * A key ownership proof provided as part of an equivocation report is invalid.
       **/
      InvalidKeyOwnershipProof: AugmentedError<ApiType>;
      /**
       * Attempt to signal GRANDPA pause when the authority set isn't live
       * (either paused or already pending pause).
       **/
      PauseFailed: AugmentedError<ApiType>;
      /**
       * Attempt to signal GRANDPA resume when the authority set isn't paused
       * (either live or already pending resume).
       **/
      ResumeFailed: AugmentedError<ApiType>;
      /**
       * Cannot signal forced change so soon after last.
       **/
      TooSoon: AugmentedError<ApiType>;
      /**
       * Generic error
       **/
      [key: string]: AugmentedError<ApiType>;
    };
    identity: {
      /**
       * Creator not allowed to create identities
       **/
      CreatorNotAllowedToCreateIdty: AugmentedError<ApiType>;
      /**
       * Identity already confirmed
       **/
      IdtyAlreadyConfirmed: AugmentedError<ApiType>;
      /**
       * Identity already created
       **/
      IdtyAlreadyCreated: AugmentedError<ApiType>;
      /**
       * Identity already validated
       **/
      IdtyAlreadyValidated: AugmentedError<ApiType>;
      /**
       * You are not allowed to create a new identity now
       **/
      IdtyCreationNotAllowed: AugmentedError<ApiType>;
      /**
       * Identity index not found
       **/
      IdtyIndexNotFound: AugmentedError<ApiType>;
      /**
       * Identity name already exists
       **/
      IdtyNameAlreadyExist: AugmentedError<ApiType>;
      /**
       * Invalid identity name
       **/
      IdtyNameInvalid: AugmentedError<ApiType>;
      /**
       * Identity not confirmed by its owner
       **/
      IdtyNotConfirmedByOwner: AugmentedError<ApiType>;
      /**
       * Identity not found
       **/
      IdtyNotFound: AugmentedError<ApiType>;
      /**
       * Identity not member
       **/
      IdtyNotMember: AugmentedError<ApiType>;
      /**
       * Identity not validated
       **/
      IdtyNotValidated: AugmentedError<ApiType>;
      /**
       * Identity not yet renewable
       **/
      IdtyNotYetRenewable: AugmentedError<ApiType>;
      /**
       * Genesis hash does not match
       **/
      InvalidGenesisHash: AugmentedError<ApiType>;
      /**
       * Revocation payload signature is invalid
       **/
      InvalidRevocationProof: AugmentedError<ApiType>;
      /**
       * Not allowed to confirm identity
       **/
      NotAllowedToConfirmIdty: AugmentedError<ApiType>;
      /**
       * Not allowed to validate identity
       **/
      NotAllowedToValidateIdty: AugmentedError<ApiType>;
      /**
       * Identity creation period is not respected
       **/
      NotRespectIdtyCreationPeriod: AugmentedError<ApiType>;
      /**
       * Not the same identity name
       **/
      NotSameIdtyName: AugmentedError<ApiType>;
      /**
       * Right already added
       **/
      RightAlreadyAdded: AugmentedError<ApiType>;
      /**
       * Right does not exist
       **/
      RightNotExist: AugmentedError<ApiType>;
      /**
       * Generic error
       **/
      [key: string]: AugmentedError<ApiType>;
    };
    imOnline: {
      /**
       * Duplicated heartbeat.
       **/
      DuplicatedHeartbeat: AugmentedError<ApiType>;
      /**
       * Non existent public key.
       **/
      InvalidKey: AugmentedError<ApiType>;
      /**
       * Generic error
       **/
      [key: string]: AugmentedError<ApiType>;
    };
    membership: {
      /**
       * Identity id not found
       **/
      IdtyIdNotFound: AugmentedError<ApiType>;
      /**
       * Identity not allowed to renew membership
       **/
      IdtyNotAllowedToRenewMembership: AugmentedError<ApiType>;
      /**
       * Identity not allowed to request membership
       **/
      IdtyNotAllowedToRequestMembership: AugmentedError<ApiType>;
      /**
       * Invalid meta data
       **/
      InvalidMetaData: AugmentedError<ApiType>;
      /**
       * Membership already acquired
       **/
      MembershipAlreadyAcquired: AugmentedError<ApiType>;
      /**
       * Membership already requested
       **/
      MembershipAlreadyRequested: AugmentedError<ApiType>;
      /**
       * Membership not found
       **/
      MembershipNotFound: AugmentedError<ApiType>;
      /**
       * Membership not yet renewable
       **/
      MembershipNotYetRenewable: AugmentedError<ApiType>;
      /**
       * Membership request not found
       **/
      MembershipRequestNotFound: AugmentedError<ApiType>;
      /**
       * Membership revoked recently
       **/
      MembershipRevokedRecently: AugmentedError<ApiType>;
      /**
       * Origin not allowed to use this identity
       **/
      OriginNotAllowedToUseIdty: AugmentedError<ApiType>;
      /**
       * Generic error
       **/
      [key: string]: AugmentedError<ApiType>;
    };
    multisig: {
      /**
       * Call is already approved by this signatory.
       **/
      AlreadyApproved: AugmentedError<ApiType>;
      /**
       * The data to be stored is already stored.
       **/
      AlreadyStored: AugmentedError<ApiType>;
      /**
       * The maximum weight information provided was too low.
       **/
      MaxWeightTooLow: AugmentedError<ApiType>;
      /**
       * Threshold must be 2 or greater.
       **/
      MinimumThreshold: AugmentedError<ApiType>;
      /**
       * Call doesn't need any (more) approvals.
       **/
      NoApprovalsNeeded: AugmentedError<ApiType>;
      /**
       * Multisig operation not found when attempting to cancel.
       **/
      NotFound: AugmentedError<ApiType>;
      /**
       * No timepoint was given, yet the multisig operation is already underway.
       **/
      NoTimepoint: AugmentedError<ApiType>;
      /**
       * Only the account that originally created the multisig is able to cancel it.
       **/
      NotOwner: AugmentedError<ApiType>;
      /**
       * The sender was contained in the other signatories; it shouldn't be.
       **/
      SenderInSignatories: AugmentedError<ApiType>;
      /**
       * The signatories were provided out of order; they should be ordered.
       **/
      SignatoriesOutOfOrder: AugmentedError<ApiType>;
      /**
       * There are too few signatories in the list.
       **/
      TooFewSignatories: AugmentedError<ApiType>;
      /**
       * There are too many signatories in the list.
       **/
      TooManySignatories: AugmentedError<ApiType>;
      /**
       * A timepoint was given, yet no multisig operation is underway.
       **/
      UnexpectedTimepoint: AugmentedError<ApiType>;
      /**
       * A different timepoint was given to the multisig operation that is underway.
       **/
      WrongTimepoint: AugmentedError<ApiType>;
      /**
       * Generic error
       **/
      [key: string]: AugmentedError<ApiType>;
    };
    preimage: {
      /**
       * Preimage has already been noted on-chain.
       **/
      AlreadyNoted: AugmentedError<ApiType>;
      /**
       * The user is not authorized to perform this action.
       **/
      NotAuthorized: AugmentedError<ApiType>;
      /**
       * The preimage cannot be removed since it has not yet been noted.
       **/
      NotNoted: AugmentedError<ApiType>;
      /**
       * The preimage request cannot be removed since no outstanding requests exist.
       **/
      NotRequested: AugmentedError<ApiType>;
      /**
       * A preimage may not be removed when there are outstanding requests.
       **/
      Requested: AugmentedError<ApiType>;
      /**
       * Preimage is too large to store on-chain.
       **/
      TooLarge: AugmentedError<ApiType>;
      /**
       * Generic error
       **/
      [key: string]: AugmentedError<ApiType>;
    };
    provideRandomness: {
      /**
       * The queue is full, pleasy retry later
       **/
      FullQueue: AugmentedError<ApiType>;
      /**
       * Generic error
       **/
      [key: string]: AugmentedError<ApiType>;
    };
    proxy: {
      /**
       * Account is already a proxy.
       **/
      Duplicate: AugmentedError<ApiType>;
      /**
       * Call may not be made by proxy because it may escalate its privileges.
       **/
      NoPermission: AugmentedError<ApiType>;
      /**
       * Cannot add self as proxy.
       **/
      NoSelfProxy: AugmentedError<ApiType>;
      /**
       * Proxy registration not found.
       **/
      NotFound: AugmentedError<ApiType>;
      /**
       * Sender is not a proxy of the account to be proxied.
       **/
      NotProxy: AugmentedError<ApiType>;
      /**
       * There are too many proxies registered or too many announcements pending.
       **/
      TooMany: AugmentedError<ApiType>;
      /**
       * Announcement, if made at all, was made too recently.
       **/
      Unannounced: AugmentedError<ApiType>;
      /**
       * A call which is incompatible with the proxy type's filter was attempted.
       **/
      Unproxyable: AugmentedError<ApiType>;
      /**
       * Generic error
       **/
      [key: string]: AugmentedError<ApiType>;
    };
    scheduler: {
      /**
       * Failed to schedule a call
       **/
      FailedToSchedule: AugmentedError<ApiType>;
      /**
       * Cannot find the scheduled call.
       **/
      NotFound: AugmentedError<ApiType>;
      /**
       * Reschedule failed because it does not change scheduled time.
       **/
      RescheduleNoChange: AugmentedError<ApiType>;
      /**
       * Given target block number is in the past.
       **/
      TargetBlockNumberInPast: AugmentedError<ApiType>;
      /**
       * Generic error
       **/
      [key: string]: AugmentedError<ApiType>;
    };
    session: {
      /**
       * Registered duplicate key.
       **/
      DuplicatedKey: AugmentedError<ApiType>;
      /**
       * Invalid ownership proof.
       **/
      InvalidProof: AugmentedError<ApiType>;
      /**
       * Key setting account is not live, so it's impossible to associate keys.
       **/
      NoAccount: AugmentedError<ApiType>;
      /**
       * No associated validator ID for account.
       **/
      NoAssociatedValidatorId: AugmentedError<ApiType>;
      /**
       * No keys are associated with this account.
       **/
      NoKeys: AugmentedError<ApiType>;
      /**
       * Generic error
       **/
      [key: string]: AugmentedError<ApiType>;
    };
    smithsCert: {
      /**
       * An identity cannot certify itself
       **/
      CannotCertifySelf: AugmentedError<ApiType>;
      /**
       * Certification non autorisée
       **/
      CertNotAllowed: AugmentedError<ApiType>;
      /**
       * An identity must receive certifications before it can issue them.
       **/
      IdtyMustReceiveCertsBeforeCanIssue: AugmentedError<ApiType>;
      /**
       * This identity has already issued the maximum number of certifications
       **/
      IssuedTooManyCert: AugmentedError<ApiType>;
      /**
       * Issuer not found
       **/
      IssuerNotFound: AugmentedError<ApiType>;
      /**
       * Not enough certifications received
       **/
      NotEnoughCertReceived: AugmentedError<ApiType>;
      /**
       * This identity has already issued a certification too recently
       **/
      NotRespectCertPeriod: AugmentedError<ApiType>;
      /**
       * This certification has already been issued or renewed recently
       **/
      NotRespectRenewablePeriod: AugmentedError<ApiType>;
      /**
       * Receiver not found
       **/
      ReceiverNotFound: AugmentedError<ApiType>;
      /**
       * Generic error
       **/
      [key: string]: AugmentedError<ApiType>;
    };
    smithsCollective: {
      /**
       * Members are already initialized!
       **/
      AlreadyInitialized: AugmentedError<ApiType>;
      /**
       * Duplicate proposals not allowed
       **/
      DuplicateProposal: AugmentedError<ApiType>;
      /**
       * Duplicate vote ignored
       **/
      DuplicateVote: AugmentedError<ApiType>;
      /**
       * Account is not a member
       **/
      NotMember: AugmentedError<ApiType>;
      /**
       * Proposal must exist
       **/
      ProposalMissing: AugmentedError<ApiType>;
      /**
       * The close call was made too early, before the end of the voting.
       **/
      TooEarly: AugmentedError<ApiType>;
      /**
       * There can only be a maximum of `MaxProposals` active proposals.
       **/
      TooManyProposals: AugmentedError<ApiType>;
      /**
       * Mismatched index
       **/
      WrongIndex: AugmentedError<ApiType>;
      /**
       * The given length bound for the proposal was too low.
       **/
      WrongProposalLength: AugmentedError<ApiType>;
      /**
       * The given weight bound for the proposal was too low.
       **/
      WrongProposalWeight: AugmentedError<ApiType>;
      /**
       * Generic error
       **/
      [key: string]: AugmentedError<ApiType>;
    };
    smithsMembership: {
      /**
       * Identity id not found
       **/
      IdtyIdNotFound: AugmentedError<ApiType>;
      /**
       * Identity not allowed to renew membership
       **/
      IdtyNotAllowedToRenewMembership: AugmentedError<ApiType>;
      /**
       * Identity not allowed to request membership
       **/
      IdtyNotAllowedToRequestMembership: AugmentedError<ApiType>;
      /**
       * Invalid meta data
       **/
      InvalidMetaData: AugmentedError<ApiType>;
      /**
       * Membership already acquired
       **/
      MembershipAlreadyAcquired: AugmentedError<ApiType>;
      /**
       * Membership already requested
       **/
      MembershipAlreadyRequested: AugmentedError<ApiType>;
      /**
       * Membership not found
       **/
      MembershipNotFound: AugmentedError<ApiType>;
      /**
       * Membership not yet renewable
       **/
      MembershipNotYetRenewable: AugmentedError<ApiType>;
      /**
       * Membership request not found
       **/
      MembershipRequestNotFound: AugmentedError<ApiType>;
      /**
       * Membership revoked recently
       **/
      MembershipRevokedRecently: AugmentedError<ApiType>;
      /**
       * Origin not allowed to use this identity
       **/
      OriginNotAllowedToUseIdty: AugmentedError<ApiType>;
      /**
       * Generic error
       **/
      [key: string]: AugmentedError<ApiType>;
    };
    sudo: {
      /**
       * Sender must be the Sudo account
       **/
      RequireSudo: AugmentedError<ApiType>;
      /**
       * Generic error
       **/
      [key: string]: AugmentedError<ApiType>;
    };
    system: {
      /**
       * The origin filter prevent the call to be dispatched.
       **/
      CallFiltered: AugmentedError<ApiType>;
      /**
       * Failed to extract the runtime version from the new runtime.
       * 
       * Either calling `Core_version` or decoding `RuntimeVersion` failed.
       **/
      FailedToExtractRuntimeVersion: AugmentedError<ApiType>;
      /**
       * The name of specification does not match between the current runtime
       * and the new runtime.
       **/
      InvalidSpecName: AugmentedError<ApiType>;
      /**
       * Suicide called when the account has non-default composite data.
       **/
      NonDefaultComposite: AugmentedError<ApiType>;
      /**
       * There is a non-zero reference count preventing the account from being purged.
       **/
      NonZeroRefCount: AugmentedError<ApiType>;
      /**
       * The specification version is not allowed to decrease between the current runtime
       * and the new runtime.
       **/
      SpecVersionNeedsToIncrease: AugmentedError<ApiType>;
      /**
       * Generic error
       **/
      [key: string]: AugmentedError<ApiType>;
    };
    treasury: {
      /**
       * Proposer's balance is too low.
       **/
      InsufficientProposersBalance: AugmentedError<ApiType>;
      /**
       * No proposal or bounty at that index.
       **/
      InvalidIndex: AugmentedError<ApiType>;
      /**
       * Too many approvals in the queue.
       **/
      TooManyApprovals: AugmentedError<ApiType>;
      /**
       * Generic error
       **/
      [key: string]: AugmentedError<ApiType>;
    };
    utility: {
      /**
       * Too many calls batched.
       **/
      TooManyCalls: AugmentedError<ApiType>;
      /**
       * Generic error
       **/
      [key: string]: AugmentedError<ApiType>;
    };
  } // AugmentedErrors
} // declare module
