// Auto-generated via `yarn polkadot-types-from-defs`, do not edit
/* eslint-disable */

/* eslint-disable sort-keys */

export default {
  /**
   * Lookup3: frame_system::AccountInfo<Nonce, pallet_duniter_account::types::AccountData<Balance, IdtyId>>
   **/
  FrameSystemAccountInfo: {
    nonce: 'u32',
    consumers: 'u32',
    providers: 'u32',
    sufficients: 'u32',
    data: 'PalletDuniterAccountAccountData'
  },
  /**
   * Lookup5: pallet_duniter_account::types::AccountData<Balance, IdtyId>
   **/
  PalletDuniterAccountAccountData: {
    free: 'u64',
    reserved: 'u64',
    feeFrozen: 'u64',
    linkedIdty: 'Option<u32>'
  },
  /**
   * Lookup8: frame_support::dispatch::PerDispatchClass<sp_weights::weight_v2::Weight>
   **/
  FrameSupportDispatchPerDispatchClassWeight: {
    normal: 'SpWeightsWeightV2Weight',
    operational: 'SpWeightsWeightV2Weight',
    mandatory: 'SpWeightsWeightV2Weight'
  },
  /**
   * Lookup9: sp_weights::weight_v2::Weight
   **/
  SpWeightsWeightV2Weight: {
    refTime: 'Compact<u64>',
    proofSize: 'Compact<u64>'
  },
  /**
   * Lookup13: sp_runtime::generic::digest::Digest
   **/
  SpRuntimeDigest: {
    logs: 'Vec<SpRuntimeDigestDigestItem>'
  },
  /**
   * Lookup15: sp_runtime::generic::digest::DigestItem
   **/
  SpRuntimeDigestDigestItem: {
    _enum: {
      Other: 'Bytes',
      __Unused1: 'Null',
      __Unused2: 'Null',
      __Unused3: 'Null',
      Consensus: '([u8;4],Bytes)',
      Seal: '([u8;4],Bytes)',
      PreRuntime: '([u8;4],Bytes)',
      __Unused7: 'Null',
      RuntimeEnvironmentUpdated: 'Null'
    }
  },
  /**
   * Lookup18: frame_system::EventRecord<gdev_runtime::RuntimeEvent, primitive_types::H256>
   **/
  FrameSystemEventRecord: {
    phase: 'FrameSystemPhase',
    event: 'Event',
    topics: 'Vec<H256>'
  },
  /**
   * Lookup20: frame_system::pallet::Event<T>
   **/
  FrameSystemEvent: {
    _enum: {
      ExtrinsicSuccess: {
        dispatchInfo: 'FrameSupportDispatchDispatchInfo',
      },
      ExtrinsicFailed: {
        dispatchError: 'SpRuntimeDispatchError',
        dispatchInfo: 'FrameSupportDispatchDispatchInfo',
      },
      CodeUpdated: 'Null',
      NewAccount: {
        account: 'AccountId32',
      },
      KilledAccount: {
        account: 'AccountId32',
      },
      Remarked: {
        _alias: {
          hash_: 'hash',
        },
        sender: 'AccountId32',
        hash_: 'H256',
      },
      UpgradeAuthorized: {
        codeHash: 'H256',
        checkVersion: 'bool'
      }
    }
  },
  /**
   * Lookup21: frame_support::dispatch::DispatchInfo
   **/
  FrameSupportDispatchDispatchInfo: {
    weight: 'SpWeightsWeightV2Weight',
    class: 'FrameSupportDispatchDispatchClass',
    paysFee: 'FrameSupportDispatchPays'
  },
  /**
   * Lookup22: frame_support::dispatch::DispatchClass
   **/
  FrameSupportDispatchDispatchClass: {
    _enum: ['Normal', 'Operational', 'Mandatory']
  },
  /**
   * Lookup23: frame_support::dispatch::Pays
   **/
  FrameSupportDispatchPays: {
    _enum: ['Yes', 'No']
  },
  /**
   * Lookup24: sp_runtime::DispatchError
   **/
  SpRuntimeDispatchError: {
    _enum: {
      Other: 'Null',
      CannotLookup: 'Null',
      BadOrigin: 'Null',
      Module: 'SpRuntimeModuleError',
      ConsumerRemaining: 'Null',
      NoProviders: 'Null',
      TooManyConsumers: 'Null',
      Token: 'SpRuntimeTokenError',
      Arithmetic: 'SpArithmeticArithmeticError',
      Transactional: 'SpRuntimeTransactionalError',
      Exhausted: 'Null',
      Corruption: 'Null',
      Unavailable: 'Null',
      RootNotAllowed: 'Null'
    }
  },
  /**
   * Lookup25: sp_runtime::ModuleError
   **/
  SpRuntimeModuleError: {
    index: 'u8',
    error: '[u8;4]'
  },
  /**
   * Lookup26: sp_runtime::TokenError
   **/
  SpRuntimeTokenError: {
    _enum: ['FundsUnavailable', 'OnlyProvider', 'BelowMinimum', 'CannotCreate', 'UnknownAsset', 'Frozen', 'Unsupported', 'CannotCreateHold', 'NotExpendable', 'Blocked']
  },
  /**
   * Lookup27: sp_arithmetic::ArithmeticError
   **/
  SpArithmeticArithmeticError: {
    _enum: ['Underflow', 'Overflow', 'DivisionByZero']
  },
  /**
   * Lookup28: sp_runtime::TransactionalError
   **/
  SpRuntimeTransactionalError: {
    _enum: ['LimitReached', 'NoLayer']
  },
  /**
   * Lookup30: pallet_duniter_account::pallet::Event<T>
   **/
  PalletDuniterAccountEvent: {
    _enum: {
      AccountLinked: {
        who: 'AccountId32',
        identity: 'u32',
      },
      AccountUnlinked: 'AccountId32'
    }
  },
  /**
   * Lookup31: pallet_scheduler::pallet::Event<T>
   **/
  PalletSchedulerEvent: {
    _enum: {
      Scheduled: {
        when: 'u32',
        index: 'u32',
      },
      Canceled: {
        when: 'u32',
        index: 'u32',
      },
      Dispatched: {
        task: '(u32,u32)',
        id: 'Option<[u8;32]>',
        result: 'Result<Null, SpRuntimeDispatchError>',
      },
      CallUnavailable: {
        task: '(u32,u32)',
        id: 'Option<[u8;32]>',
      },
      PeriodicFailed: {
        task: '(u32,u32)',
        id: 'Option<[u8;32]>',
      },
      PermanentlyOverweight: {
        task: '(u32,u32)',
        id: 'Option<[u8;32]>'
      }
    }
  },
  /**
   * Lookup36: pallet_balances::pallet::Event<T, I>
   **/
  PalletBalancesEvent: {
    _enum: {
      Endowed: {
        account: 'AccountId32',
        freeBalance: 'u64',
      },
      DustLost: {
        account: 'AccountId32',
        amount: 'u64',
      },
      Transfer: {
        from: 'AccountId32',
        to: 'AccountId32',
        amount: 'u64',
      },
      BalanceSet: {
        who: 'AccountId32',
        free: 'u64',
      },
      Reserved: {
        who: 'AccountId32',
        amount: 'u64',
      },
      Unreserved: {
        who: 'AccountId32',
        amount: 'u64',
      },
      ReserveRepatriated: {
        from: 'AccountId32',
        to: 'AccountId32',
        amount: 'u64',
        destinationStatus: 'FrameSupportTokensMiscBalanceStatus',
      },
      Deposit: {
        who: 'AccountId32',
        amount: 'u64',
      },
      Withdraw: {
        who: 'AccountId32',
        amount: 'u64',
      },
      Slashed: {
        who: 'AccountId32',
        amount: 'u64',
      },
      Minted: {
        who: 'AccountId32',
        amount: 'u64',
      },
      Burned: {
        who: 'AccountId32',
        amount: 'u64',
      },
      Suspended: {
        who: 'AccountId32',
        amount: 'u64',
      },
      Restored: {
        who: 'AccountId32',
        amount: 'u64',
      },
      Upgraded: {
        who: 'AccountId32',
      },
      Issued: {
        amount: 'u64',
      },
      Rescinded: {
        amount: 'u64',
      },
      Locked: {
        who: 'AccountId32',
        amount: 'u64',
      },
      Unlocked: {
        who: 'AccountId32',
        amount: 'u64',
      },
      Frozen: {
        who: 'AccountId32',
        amount: 'u64',
      },
      Thawed: {
        who: 'AccountId32',
        amount: 'u64'
      }
    }
  },
  /**
   * Lookup37: frame_support::traits::tokens::misc::BalanceStatus
   **/
  FrameSupportTokensMiscBalanceStatus: {
    _enum: ['Free', 'Reserved']
  },
  /**
   * Lookup38: pallet_transaction_payment::pallet::Event<T>
   **/
  PalletTransactionPaymentEvent: {
    _enum: {
      TransactionFeePaid: {
        who: 'AccountId32',
        actualFee: 'u64',
        tip: 'u64'
      }
    }
  },
  /**
   * Lookup39: pallet_oneshot_account::pallet::Event<T>
   **/
  PalletOneshotAccountEvent: {
    _enum: {
      OneshotAccountCreated: {
        account: 'AccountId32',
        balance: 'u64',
        creator: 'AccountId32',
      },
      OneshotAccountConsumed: {
        account: 'AccountId32',
        dest1: '(AccountId32,u64)',
        dest2: 'Option<(AccountId32,u64)>',
      },
      Withdraw: {
        account: 'AccountId32',
        balance: 'u64'
      }
    }
  },
  /**
   * Lookup42: pallet_quota::pallet::Event<T>
   **/
  PalletQuotaEvent: {
    _enum: {
      Refunded: {
        who: 'AccountId32',
        identity: 'u32',
        amount: 'u64',
      },
      NoQuotaForIdty: 'u32',
      NoMoreCurrencyForRefund: 'Null',
      RefundFailed: 'AccountId32',
      RefundQueueFull: 'Null'
    }
  },
  /**
   * Lookup43: pallet_smith_members::pallet::Event<T>
   **/
  PalletSmithMembersEvent: {
    _enum: {
      InvitationSent: {
        receiver: 'u32',
        issuer: 'u32',
      },
      InvitationAccepted: {
        idtyIndex: 'u32',
      },
      SmithCertAdded: {
        receiver: 'u32',
        issuer: 'u32',
      },
      SmithCertRemoved: {
        receiver: 'u32',
        issuer: 'u32',
      },
      SmithMembershipAdded: {
        idtyIndex: 'u32',
      },
      SmithMembershipRemoved: {
        idtyIndex: 'u32'
      }
    }
  },
  /**
   * Lookup44: pallet_authority_members::pallet::Event<T>
   **/
  PalletAuthorityMembersEvent: {
    _enum: {
      IncomingAuthorities: {
        members: 'Vec<u32>',
      },
      OutgoingAuthorities: {
        members: 'Vec<u32>',
      },
      MemberGoOffline: {
        member: 'u32',
      },
      MemberGoOnline: {
        member: 'u32',
      },
      MemberRemoved: {
        member: 'u32',
      },
      MemberRemovedFromBlacklist: {
        member: 'u32',
      },
      MemberAddedToBlacklist: {
        member: 'u32'
      }
    }
  },
  /**
   * Lookup46: pallet_offences::pallet::Event
   **/
  PalletOffencesEvent: {
    _enum: {
      Offence: {
        kind: '[u8;16]',
        timeslot: 'Bytes'
      }
    }
  },
  /**
   * Lookup48: pallet_session::pallet::Event
   **/
  PalletSessionEvent: {
    _enum: {
      NewSession: {
        sessionIndex: 'u32'
      }
    }
  },
  /**
   * Lookup49: pallet_grandpa::pallet::Event
   **/
  PalletGrandpaEvent: {
    _enum: {
      NewAuthorities: {
        authoritySet: 'Vec<(SpConsensusGrandpaAppPublic,u64)>',
      },
      Paused: 'Null',
      Resumed: 'Null'
    }
  },
  /**
   * Lookup52: sp_consensus_grandpa::app::Public
   **/
  SpConsensusGrandpaAppPublic: 'SpCoreEd25519Public',
  /**
   * Lookup53: sp_core::ed25519::Public
   **/
  SpCoreEd25519Public: '[u8;32]',
  /**
   * Lookup54: pallet_im_online::pallet::Event<T>
   **/
  PalletImOnlineEvent: {
    _enum: {
      HeartbeatReceived: {
        authorityId: 'PalletImOnlineSr25519AppSr25519Public',
      },
      AllGood: 'Null',
      SomeOffline: {
        offline: 'Vec<(AccountId32,CommonRuntimeEntitiesValidatorFullIdentification)>'
      }
    }
  },
  /**
   * Lookup55: pallet_im_online::sr25519::app_sr25519::Public
   **/
  PalletImOnlineSr25519AppSr25519Public: 'SpCoreSr25519Public',
  /**
   * Lookup56: sp_core::sr25519::Public
   **/
  SpCoreSr25519Public: '[u8;32]',
  /**
   * Lookup59: common_runtime::entities::ValidatorFullIdentification
   **/
  CommonRuntimeEntitiesValidatorFullIdentification: 'Null',
  /**
   * Lookup60: pallet_sudo::pallet::Event<T>
   **/
  PalletSudoEvent: {
    _enum: {
      Sudid: {
        sudoResult: 'Result<Null, SpRuntimeDispatchError>',
      },
      KeyChanged: {
        _alias: {
          new_: 'new',
        },
        old: 'Option<AccountId32>',
        new_: 'AccountId32',
      },
      KeyRemoved: 'Null',
      SudoAsDone: {
        sudoResult: 'Result<Null, SpRuntimeDispatchError>'
      }
    }
  },
  /**
   * Lookup62: pallet_upgrade_origin::pallet::Event
   **/
  PalletUpgradeOriginEvent: {
    _enum: {
      DispatchedAsRoot: {
        result: 'Result<Null, SpRuntimeDispatchError>'
      }
    }
  },
  /**
   * Lookup63: pallet_preimage::pallet::Event<T>
   **/
  PalletPreimageEvent: {
    _enum: {
      Noted: {
        _alias: {
          hash_: 'hash',
        },
        hash_: 'H256',
      },
      Requested: {
        _alias: {
          hash_: 'hash',
        },
        hash_: 'H256',
      },
      Cleared: {
        _alias: {
          hash_: 'hash',
        },
        hash_: 'H256'
      }
    }
  },
  /**
   * Lookup64: pallet_collective::pallet::Event<T, I>
   **/
  PalletCollectiveEvent: {
    _enum: {
      Proposed: {
        account: 'AccountId32',
        proposalIndex: 'u32',
        proposalHash: 'H256',
        threshold: 'u32',
      },
      Voted: {
        account: 'AccountId32',
        proposalHash: 'H256',
        voted: 'bool',
        yes: 'u32',
        no: 'u32',
      },
      Approved: {
        proposalHash: 'H256',
      },
      Disapproved: {
        proposalHash: 'H256',
      },
      Executed: {
        proposalHash: 'H256',
        result: 'Result<Null, SpRuntimeDispatchError>',
      },
      MemberExecuted: {
        proposalHash: 'H256',
        result: 'Result<Null, SpRuntimeDispatchError>',
      },
      Closed: {
        proposalHash: 'H256',
        yes: 'u32',
        no: 'u32'
      }
    }
  },
  /**
   * Lookup65: pallet_universal_dividend::pallet::Event<T>
   **/
  PalletUniversalDividendEvent: {
    _enum: {
      NewUdCreated: {
        amount: 'u64',
        index: 'u16',
        monetaryMass: 'u64',
        membersCount: 'u64',
      },
      UdReevalued: {
        newUdAmount: 'u64',
        monetaryMass: 'u64',
        membersCount: 'u64',
      },
      UdsAutoPaid: {
        count: 'u16',
        total: 'u64',
        who: 'AccountId32',
      },
      UdsClaimed: {
        count: 'u16',
        total: 'u64',
        who: 'AccountId32'
      }
    }
  },
  /**
   * Lookup67: pallet_identity::pallet::Event<T>
   **/
  PalletIdentityEvent: {
    _enum: {
      IdtyCreated: {
        idtyIndex: 'u32',
        ownerKey: 'AccountId32',
      },
      IdtyConfirmed: {
        idtyIndex: 'u32',
        ownerKey: 'AccountId32',
        name: 'Bytes',
      },
      IdtyValidated: {
        idtyIndex: 'u32',
      },
      IdtyChangedOwnerKey: {
        idtyIndex: 'u32',
        newOwnerKey: 'AccountId32',
      },
      IdtyRevoked: {
        idtyIndex: 'u32',
        reason: 'PalletIdentityRevocationReason',
      },
      IdtyRemoved: {
        idtyIndex: 'u32',
        reason: 'PalletIdentityRemovalReason'
      }
    }
  },
  /**
   * Lookup69: pallet_identity::types::RevocationReason
   **/
  PalletIdentityRevocationReason: {
    _enum: ['Root', 'User', 'Expired']
  },
  /**
   * Lookup70: pallet_identity::types::RemovalReason
   **/
  PalletIdentityRemovalReason: {
    _enum: ['Root', 'Unconfirmed', 'Unvalidated', 'Revoked']
  },
  /**
   * Lookup71: pallet_membership::pallet::Event<T>
   **/
  PalletMembershipEvent: {
    _enum: {
      MembershipAdded: {
        member: 'u32',
        expireOn: 'u32',
      },
      MembershipRenewed: {
        member: 'u32',
        expireOn: 'u32',
      },
      MembershipRemoved: {
        member: 'u32',
        reason: 'PalletMembershipMembershipRemovalReason'
      }
    }
  },
  /**
   * Lookup72: pallet_membership::MembershipRemovalReason
   **/
  PalletMembershipMembershipRemovalReason: {
    _enum: ['Expired', 'Revoked', 'NotEnoughCerts', 'System']
  },
  /**
   * Lookup73: pallet_certification::pallet::Event<T>
   **/
  PalletCertificationEvent: {
    _enum: {
      CertAdded: {
        issuer: 'u32',
        receiver: 'u32',
      },
      CertRemoved: {
        issuer: 'u32',
        receiver: 'u32',
        expiration: 'bool',
      },
      CertRenewed: {
        issuer: 'u32',
        receiver: 'u32'
      }
    }
  },
  /**
   * Lookup74: pallet_distance::pallet::Event<T>
   **/
  PalletDistanceEvent: {
    _enum: {
      EvaluationRequested: {
        idtyIndex: 'u32',
        who: 'AccountId32',
      },
      EvaluatedValid: {
        idtyIndex: 'u32',
      },
      EvaluatedInvalid: {
        idtyIndex: 'u32'
      }
    }
  },
  /**
   * Lookup75: pallet_atomic_swap::pallet::Event<T>
   **/
  PalletAtomicSwapEvent: {
    _enum: {
      NewSwap: {
        account: 'AccountId32',
        proof: '[u8;32]',
        swap: 'PalletAtomicSwapPendingSwap',
      },
      SwapClaimed: {
        account: 'AccountId32',
        proof: '[u8;32]',
        success: 'bool',
      },
      SwapCancelled: {
        account: 'AccountId32',
        proof: '[u8;32]'
      }
    }
  },
  /**
   * Lookup76: pallet_atomic_swap::PendingSwap<T>
   **/
  PalletAtomicSwapPendingSwap: {
    source: 'AccountId32',
    action: 'PalletAtomicSwapBalanceSwapAction',
    endBlock: 'u32'
  },
  /**
   * Lookup77: pallet_atomic_swap::BalanceSwapAction<sp_core::crypto::AccountId32, C>
   **/
  PalletAtomicSwapBalanceSwapAction: {
    value: 'u64'
  },
  /**
   * Lookup78: pallet_multisig::pallet::Event<T>
   **/
  PalletMultisigEvent: {
    _enum: {
      NewMultisig: {
        approving: 'AccountId32',
        multisig: 'AccountId32',
        callHash: '[u8;32]',
      },
      MultisigApproval: {
        approving: 'AccountId32',
        timepoint: 'PalletMultisigTimepoint',
        multisig: 'AccountId32',
        callHash: '[u8;32]',
      },
      MultisigExecuted: {
        approving: 'AccountId32',
        timepoint: 'PalletMultisigTimepoint',
        multisig: 'AccountId32',
        callHash: '[u8;32]',
        result: 'Result<Null, SpRuntimeDispatchError>',
      },
      MultisigCancelled: {
        cancelling: 'AccountId32',
        timepoint: 'PalletMultisigTimepoint',
        multisig: 'AccountId32',
        callHash: '[u8;32]'
      }
    }
  },
  /**
   * Lookup79: pallet_multisig::Timepoint<BlockNumber>
   **/
  PalletMultisigTimepoint: {
    height: 'u32',
    index: 'u32'
  },
  /**
   * Lookup80: pallet_provide_randomness::pallet::Event
   **/
  PalletProvideRandomnessEvent: {
    _enum: {
      FilledRandomness: {
        requestId: 'u64',
        randomness: 'H256',
      },
      RequestedRandomness: {
        _alias: {
          r_type: 'r#type',
        },
        requestId: 'u64',
        salt: 'H256',
        r_type: 'PalletProvideRandomnessRandomnessType'
      }
    }
  },
  /**
   * Lookup81: pallet_provide_randomness::types::RandomnessType
   **/
  PalletProvideRandomnessRandomnessType: {
    _enum: ['RandomnessFromPreviousBlock', 'RandomnessFromOneEpochAgo', 'RandomnessFromTwoEpochsAgo']
  },
  /**
   * Lookup82: pallet_proxy::pallet::Event<T>
   **/
  PalletProxyEvent: {
    _enum: {
      ProxyExecuted: {
        result: 'Result<Null, SpRuntimeDispatchError>',
      },
      PureCreated: {
        pure: 'AccountId32',
        who: 'AccountId32',
        proxyType: 'GdevRuntimeProxyType',
        disambiguationIndex: 'u16',
      },
      Announced: {
        real: 'AccountId32',
        proxy: 'AccountId32',
        callHash: 'H256',
      },
      ProxyAdded: {
        delegator: 'AccountId32',
        delegatee: 'AccountId32',
        proxyType: 'GdevRuntimeProxyType',
        delay: 'u32',
      },
      ProxyRemoved: {
        delegator: 'AccountId32',
        delegatee: 'AccountId32',
        proxyType: 'GdevRuntimeProxyType',
        delay: 'u32'
      }
    }
  },
  /**
   * Lookup83: gdev_runtime::ProxyType
   **/
  GdevRuntimeProxyType: {
    _enum: ['AlmostAny', 'TransferOnly', 'CancelProxy', 'TechnicalCommitteePropose']
  },
  /**
   * Lookup84: pallet_utility::pallet::Event
   **/
  PalletUtilityEvent: {
    _enum: {
      BatchInterrupted: {
        index: 'u32',
        error: 'SpRuntimeDispatchError',
      },
      BatchCompleted: 'Null',
      BatchCompletedWithErrors: 'Null',
      ItemCompleted: 'Null',
      ItemFailed: {
        error: 'SpRuntimeDispatchError',
      },
      DispatchedAs: {
        result: 'Result<Null, SpRuntimeDispatchError>'
      }
    }
  },
  /**
   * Lookup85: pallet_treasury::pallet::Event<T, I>
   **/
  PalletTreasuryEvent: {
    _enum: {
      Proposed: {
        proposalIndex: 'u32',
      },
      Spending: {
        budgetRemaining: 'u64',
      },
      Awarded: {
        proposalIndex: 'u32',
        award: 'u64',
        account: 'AccountId32',
      },
      Rejected: {
        proposalIndex: 'u32',
        slashed: 'u64',
      },
      Burnt: {
        burntFunds: 'u64',
      },
      Rollover: {
        rolloverBalance: 'u64',
      },
      Deposit: {
        value: 'u64',
      },
      SpendApproved: {
        proposalIndex: 'u32',
        amount: 'u64',
        beneficiary: 'AccountId32',
      },
      UpdatedInactive: {
        reactivated: 'u64',
        deactivated: 'u64',
      },
      AssetSpendApproved: {
        index: 'u32',
        assetKind: 'Null',
        amount: 'u64',
        beneficiary: 'AccountId32',
        validFrom: 'u32',
        expireAt: 'u32',
      },
      AssetSpendVoided: {
        index: 'u32',
      },
      Paid: {
        index: 'u32',
        paymentId: 'Null',
      },
      PaymentFailed: {
        index: 'u32',
        paymentId: 'Null',
      },
      SpendProcessed: {
        index: 'u32'
      }
    }
  },
  /**
   * Lookup86: frame_system::Phase
   **/
  FrameSystemPhase: {
    _enum: {
      ApplyExtrinsic: 'u32',
      Finalization: 'Null',
      Initialization: 'Null'
    }
  },
  /**
   * Lookup89: frame_system::LastRuntimeUpgradeInfo
   **/
  FrameSystemLastRuntimeUpgradeInfo: {
    specVersion: 'Compact<u32>',
    specName: 'Text'
  },
  /**
   * Lookup92: frame_system::CodeUpgradeAuthorization<T>
   **/
  FrameSystemCodeUpgradeAuthorization: {
    codeHash: 'H256',
    checkVersion: 'bool'
  },
  /**
   * Lookup93: frame_system::pallet::Call<T>
   **/
  FrameSystemCall: {
    _enum: {
      remark: {
        remark: 'Bytes',
      },
      set_heap_pages: {
        pages: 'u64',
      },
      set_code: {
        code: 'Bytes',
      },
      set_code_without_checks: {
        code: 'Bytes',
      },
      set_storage: {
        items: 'Vec<(Bytes,Bytes)>',
      },
      kill_storage: {
        _alias: {
          keys_: 'keys',
        },
        keys_: 'Vec<Bytes>',
      },
      kill_prefix: {
        prefix: 'Bytes',
        subkeys: 'u32',
      },
      remark_with_event: {
        remark: 'Bytes',
      },
      __Unused8: 'Null',
      authorize_upgrade: {
        codeHash: 'H256',
      },
      authorize_upgrade_without_checks: {
        codeHash: 'H256',
      },
      apply_authorized_upgrade: {
        code: 'Bytes'
      }
    }
  },
  /**
   * Lookup97: frame_system::limits::BlockWeights
   **/
  FrameSystemLimitsBlockWeights: {
    baseBlock: 'SpWeightsWeightV2Weight',
    maxBlock: 'SpWeightsWeightV2Weight',
    perClass: 'FrameSupportDispatchPerDispatchClassWeightsPerClass'
  },
  /**
   * Lookup98: frame_support::dispatch::PerDispatchClass<frame_system::limits::WeightsPerClass>
   **/
  FrameSupportDispatchPerDispatchClassWeightsPerClass: {
    normal: 'FrameSystemLimitsWeightsPerClass',
    operational: 'FrameSystemLimitsWeightsPerClass',
    mandatory: 'FrameSystemLimitsWeightsPerClass'
  },
  /**
   * Lookup99: frame_system::limits::WeightsPerClass
   **/
  FrameSystemLimitsWeightsPerClass: {
    baseExtrinsic: 'SpWeightsWeightV2Weight',
    maxExtrinsic: 'Option<SpWeightsWeightV2Weight>',
    maxTotal: 'Option<SpWeightsWeightV2Weight>',
    reserved: 'Option<SpWeightsWeightV2Weight>'
  },
  /**
   * Lookup101: frame_system::limits::BlockLength
   **/
  FrameSystemLimitsBlockLength: {
    max: 'FrameSupportDispatchPerDispatchClassU32'
  },
  /**
   * Lookup102: frame_support::dispatch::PerDispatchClass<T>
   **/
  FrameSupportDispatchPerDispatchClassU32: {
    normal: 'u32',
    operational: 'u32',
    mandatory: 'u32'
  },
  /**
   * Lookup103: sp_weights::RuntimeDbWeight
   **/
  SpWeightsRuntimeDbWeight: {
    read: 'u64',
    write: 'u64'
  },
  /**
   * Lookup104: sp_version::RuntimeVersion
   **/
  SpVersionRuntimeVersion: {
    specName: 'Text',
    implName: 'Text',
    authoringVersion: 'u32',
    specVersion: 'u32',
    implVersion: 'u32',
    apis: 'Vec<([u8;8],u32)>',
    transactionVersion: 'u32',
    stateVersion: 'u8'
  },
  /**
   * Lookup109: frame_system::pallet::Error<T>
   **/
  FrameSystemError: {
    _enum: ['InvalidSpecName', 'SpecVersionNeedsToIncrease', 'FailedToExtractRuntimeVersion', 'NonDefaultComposite', 'NonZeroRefCount', 'CallFiltered', 'NothingAuthorized', 'Unauthorized']
  },
  /**
   * Lookup110: pallet_duniter_account::pallet::Call<T>
   **/
  PalletDuniterAccountCall: {
    _enum: ['unlink_identity']
  },
  /**
   * Lookup113: pallet_scheduler::Scheduled<Name, frame_support::traits::preimages::Bounded<gdev_runtime::RuntimeCall, sp_runtime::traits::BlakeTwo256>, BlockNumber, gdev_runtime::OriginCaller, sp_core::crypto::AccountId32>
   **/
  PalletSchedulerScheduled: {
    maybeId: 'Option<[u8;32]>',
    priority: 'u8',
    call: 'FrameSupportPreimagesBounded',
    maybePeriodic: 'Option<(u32,u32)>',
    origin: 'GdevRuntimeOriginCaller'
  },
  /**
   * Lookup114: frame_support::traits::preimages::Bounded<gdev_runtime::RuntimeCall, sp_runtime::traits::BlakeTwo256>
   **/
  FrameSupportPreimagesBounded: {
    _enum: {
      Legacy: {
        _alias: {
          hash_: 'hash',
        },
        hash_: 'H256',
      },
      Inline: 'Bytes',
      Lookup: {
        _alias: {
          hash_: 'hash',
        },
        hash_: 'H256',
        len: 'u32'
      }
    }
  },
  /**
   * Lookup116: pallet_scheduler::pallet::Call<T>
   **/
  PalletSchedulerCall: {
    _enum: {
      schedule: {
        when: 'u32',
        maybePeriodic: 'Option<(u32,u32)>',
        priority: 'u8',
        call: 'Call',
      },
      cancel: {
        when: 'u32',
        index: 'u32',
      },
      schedule_named: {
        id: '[u8;32]',
        when: 'u32',
        maybePeriodic: 'Option<(u32,u32)>',
        priority: 'u8',
        call: 'Call',
      },
      cancel_named: {
        id: '[u8;32]',
      },
      schedule_after: {
        after: 'u32',
        maybePeriodic: 'Option<(u32,u32)>',
        priority: 'u8',
        call: 'Call',
      },
      schedule_named_after: {
        id: '[u8;32]',
        after: 'u32',
        maybePeriodic: 'Option<(u32,u32)>',
        priority: 'u8',
        call: 'Call'
      }
    }
  },
  /**
   * Lookup118: pallet_babe::pallet::Call<T>
   **/
  PalletBabeCall: {
    _enum: {
      report_equivocation: {
        equivocationProof: 'SpConsensusSlotsEquivocationProof',
        keyOwnerProof: 'SpSessionMembershipProof',
      },
      report_equivocation_unsigned: {
        equivocationProof: 'SpConsensusSlotsEquivocationProof',
        keyOwnerProof: 'SpSessionMembershipProof',
      },
      plan_config_change: {
        config: 'SpConsensusBabeDigestsNextConfigDescriptor'
      }
    }
  },
  /**
   * Lookup119: sp_consensus_slots::EquivocationProof<sp_runtime::generic::header::Header<Number, Hash>, sp_consensus_babe::app::Public>
   **/
  SpConsensusSlotsEquivocationProof: {
    offender: 'SpConsensusBabeAppPublic',
    slot: 'u64',
    firstHeader: 'SpRuntimeHeader',
    secondHeader: 'SpRuntimeHeader'
  },
  /**
   * Lookup120: sp_runtime::generic::header::Header<Number, Hash>
   **/
  SpRuntimeHeader: {
    parentHash: 'H256',
    number: 'Compact<u32>',
    stateRoot: 'H256',
    extrinsicsRoot: 'H256',
    digest: 'SpRuntimeDigest'
  },
  /**
   * Lookup121: sp_consensus_babe::app::Public
   **/
  SpConsensusBabeAppPublic: 'SpCoreSr25519Public',
  /**
   * Lookup123: sp_session::MembershipProof
   **/
  SpSessionMembershipProof: {
    session: 'u32',
    trieNodes: 'Vec<Bytes>',
    validatorCount: 'u32'
  },
  /**
   * Lookup124: sp_consensus_babe::digests::NextConfigDescriptor
   **/
  SpConsensusBabeDigestsNextConfigDescriptor: {
    _enum: {
      __Unused0: 'Null',
      V1: {
        c: '(u64,u64)',
        allowedSlots: 'SpConsensusBabeAllowedSlots'
      }
    }
  },
  /**
   * Lookup126: sp_consensus_babe::AllowedSlots
   **/
  SpConsensusBabeAllowedSlots: {
    _enum: ['PrimarySlots', 'PrimaryAndSecondaryPlainSlots', 'PrimaryAndSecondaryVRFSlots']
  },
  /**
   * Lookup127: pallet_timestamp::pallet::Call<T>
   **/
  PalletTimestampCall: {
    _enum: {
      set: {
        now: 'Compact<u64>'
      }
    }
  },
  /**
   * Lookup128: pallet_balances::pallet::Call<T, I>
   **/
  PalletBalancesCall: {
    _enum: {
      transfer_allow_death: {
        dest: 'MultiAddress',
        value: 'Compact<u64>',
      },
      __Unused1: 'Null',
      force_transfer: {
        source: 'MultiAddress',
        dest: 'MultiAddress',
        value: 'Compact<u64>',
      },
      transfer_keep_alive: {
        dest: 'MultiAddress',
        value: 'Compact<u64>',
      },
      transfer_all: {
        dest: 'MultiAddress',
        keepAlive: 'bool',
      },
      force_unreserve: {
        who: 'MultiAddress',
        amount: 'u64',
      },
      __Unused6: 'Null',
      __Unused7: 'Null',
      force_set_balance: {
        who: 'MultiAddress',
        newFree: 'Compact<u64>'
      }
    }
  },
  /**
   * Lookup132: pallet_oneshot_account::pallet::Call<T>
   **/
  PalletOneshotAccountCall: {
    _enum: {
      create_oneshot_account: {
        dest: 'MultiAddress',
        value: 'Compact<u64>',
      },
      consume_oneshot_account: {
        blockHeight: 'u32',
        dest: 'PalletOneshotAccountAccount',
      },
      consume_oneshot_account_with_remaining: {
        blockHeight: 'u32',
        dest: 'PalletOneshotAccountAccount',
        remainingTo: 'PalletOneshotAccountAccount',
        balance: 'Compact<u64>'
      }
    }
  },
  /**
   * Lookup133: pallet_oneshot_account::types::Account<sp_runtime::multiaddress::MultiAddress<sp_core::crypto::AccountId32, AccountIndex>>
   **/
  PalletOneshotAccountAccount: {
    _enum: {
      Normal: 'MultiAddress',
      Oneshot: 'MultiAddress'
    }
  },
  /**
   * Lookup134: pallet_smith_members::pallet::Call<T>
   **/
  PalletSmithMembersCall: {
    _enum: {
      invite_smith: {
        receiver: 'u32',
      },
      accept_invitation: 'Null',
      certify_smith: {
        receiver: 'u32'
      }
    }
  },
  /**
   * Lookup135: pallet_authority_members::pallet::Call<T>
   **/
  PalletAuthorityMembersCall: {
    _enum: {
      go_offline: 'Null',
      go_online: 'Null',
      set_session_keys: {
        _alias: {
          keys_: 'keys',
        },
        keys_: 'GdevRuntimeOpaqueSessionKeys',
      },
      remove_member: {
        memberId: 'u32',
      },
      remove_member_from_blacklist: {
        memberId: 'u32'
      }
    }
  },
  /**
   * Lookup136: gdev_runtime::opaque::SessionKeys
   **/
  GdevRuntimeOpaqueSessionKeys: {
    grandpa: 'SpConsensusGrandpaAppPublic',
    babe: 'SpConsensusBabeAppPublic',
    imOnline: 'PalletImOnlineSr25519AppSr25519Public',
    authorityDiscovery: 'SpAuthorityDiscoveryAppPublic'
  },
  /**
   * Lookup137: sp_authority_discovery::app::Public
   **/
  SpAuthorityDiscoveryAppPublic: 'SpCoreSr25519Public',
  /**
   * Lookup138: pallet_session::pallet::Call<T>
   **/
  PalletSessionCall: {
    _enum: {
      set_keys: {
        _alias: {
          keys_: 'keys',
        },
        keys_: 'GdevRuntimeOpaqueSessionKeys',
        proof: 'Bytes',
      },
      purge_keys: 'Null'
    }
  },
  /**
   * Lookup139: pallet_grandpa::pallet::Call<T>
   **/
  PalletGrandpaCall: {
    _enum: {
      report_equivocation: {
        equivocationProof: 'SpConsensusGrandpaEquivocationProof',
        keyOwnerProof: 'SpSessionMembershipProof',
      },
      report_equivocation_unsigned: {
        equivocationProof: 'SpConsensusGrandpaEquivocationProof',
        keyOwnerProof: 'SpSessionMembershipProof',
      },
      note_stalled: {
        delay: 'u32',
        bestFinalizedBlockNumber: 'u32'
      }
    }
  },
  /**
   * Lookup140: sp_consensus_grandpa::EquivocationProof<primitive_types::H256, N>
   **/
  SpConsensusGrandpaEquivocationProof: {
    setId: 'u64',
    equivocation: 'SpConsensusGrandpaEquivocation'
  },
  /**
   * Lookup141: sp_consensus_grandpa::Equivocation<primitive_types::H256, N>
   **/
  SpConsensusGrandpaEquivocation: {
    _enum: {
      Prevote: 'FinalityGrandpaEquivocationPrevote',
      Precommit: 'FinalityGrandpaEquivocationPrecommit'
    }
  },
  /**
   * Lookup142: finality_grandpa::Equivocation<sp_consensus_grandpa::app::Public, finality_grandpa::Prevote<primitive_types::H256, N>, sp_consensus_grandpa::app::Signature>
   **/
  FinalityGrandpaEquivocationPrevote: {
    roundNumber: 'u64',
    identity: 'SpConsensusGrandpaAppPublic',
    first: '(FinalityGrandpaPrevote,SpConsensusGrandpaAppSignature)',
    second: '(FinalityGrandpaPrevote,SpConsensusGrandpaAppSignature)'
  },
  /**
   * Lookup143: finality_grandpa::Prevote<primitive_types::H256, N>
   **/
  FinalityGrandpaPrevote: {
    targetHash: 'H256',
    targetNumber: 'u32'
  },
  /**
   * Lookup144: sp_consensus_grandpa::app::Signature
   **/
  SpConsensusGrandpaAppSignature: 'SpCoreEd25519Signature',
  /**
   * Lookup145: sp_core::ed25519::Signature
   **/
  SpCoreEd25519Signature: '[u8;64]',
  /**
   * Lookup148: finality_grandpa::Equivocation<sp_consensus_grandpa::app::Public, finality_grandpa::Precommit<primitive_types::H256, N>, sp_consensus_grandpa::app::Signature>
   **/
  FinalityGrandpaEquivocationPrecommit: {
    roundNumber: 'u64',
    identity: 'SpConsensusGrandpaAppPublic',
    first: '(FinalityGrandpaPrecommit,SpConsensusGrandpaAppSignature)',
    second: '(FinalityGrandpaPrecommit,SpConsensusGrandpaAppSignature)'
  },
  /**
   * Lookup149: finality_grandpa::Precommit<primitive_types::H256, N>
   **/
  FinalityGrandpaPrecommit: {
    targetHash: 'H256',
    targetNumber: 'u32'
  },
  /**
   * Lookup151: pallet_im_online::pallet::Call<T>
   **/
  PalletImOnlineCall: {
    _enum: {
      heartbeat: {
        heartbeat: 'PalletImOnlineHeartbeat',
        signature: 'PalletImOnlineSr25519AppSr25519Signature'
      }
    }
  },
  /**
   * Lookup152: pallet_im_online::Heartbeat<BlockNumber>
   **/
  PalletImOnlineHeartbeat: {
    blockNumber: 'u32',
    sessionIndex: 'u32',
    authorityIndex: 'u32',
    validatorsLen: 'u32'
  },
  /**
   * Lookup153: pallet_im_online::sr25519::app_sr25519::Signature
   **/
  PalletImOnlineSr25519AppSr25519Signature: 'SpCoreSr25519Signature',
  /**
   * Lookup154: sp_core::sr25519::Signature
   **/
  SpCoreSr25519Signature: '[u8;64]',
  /**
   * Lookup155: pallet_sudo::pallet::Call<T>
   **/
  PalletSudoCall: {
    _enum: {
      sudo: {
        call: 'Call',
      },
      sudo_unchecked_weight: {
        call: 'Call',
        weight: 'SpWeightsWeightV2Weight',
      },
      set_key: {
        _alias: {
          new_: 'new',
        },
        new_: 'MultiAddress',
      },
      sudo_as: {
        who: 'MultiAddress',
        call: 'Call',
      },
      remove_key: 'Null'
    }
  },
  /**
   * Lookup156: pallet_upgrade_origin::pallet::Call<T>
   **/
  PalletUpgradeOriginCall: {
    _enum: {
      dispatch_as_root: {
        call: 'Call',
      },
      dispatch_as_root_unchecked_weight: {
        call: 'Call',
        weight: 'SpWeightsWeightV2Weight'
      }
    }
  },
  /**
   * Lookup157: pallet_preimage::pallet::Call<T>
   **/
  PalletPreimageCall: {
    _enum: {
      note_preimage: {
        bytes: 'Bytes',
      },
      unnote_preimage: {
        _alias: {
          hash_: 'hash',
        },
        hash_: 'H256',
      },
      request_preimage: {
        _alias: {
          hash_: 'hash',
        },
        hash_: 'H256',
      },
      unrequest_preimage: {
        _alias: {
          hash_: 'hash',
        },
        hash_: 'H256',
      },
      ensure_updated: {
        hashes: 'Vec<H256>'
      }
    }
  },
  /**
   * Lookup158: pallet_collective::pallet::Call<T, I>
   **/
  PalletCollectiveCall: {
    _enum: {
      set_members: {
        newMembers: 'Vec<AccountId32>',
        prime: 'Option<AccountId32>',
        oldCount: 'u32',
      },
      execute: {
        proposal: 'Call',
        lengthBound: 'Compact<u32>',
      },
      propose: {
        threshold: 'Compact<u32>',
        proposal: 'Call',
        lengthBound: 'Compact<u32>',
      },
      vote: {
        proposal: 'H256',
        index: 'Compact<u32>',
        approve: 'bool',
      },
      __Unused4: 'Null',
      disapprove_proposal: {
        proposalHash: 'H256',
      },
      close: {
        proposalHash: 'H256',
        index: 'Compact<u32>',
        proposalWeightBound: 'SpWeightsWeightV2Weight',
        lengthBound: 'Compact<u32>'
      }
    }
  },
  /**
   * Lookup160: pallet_universal_dividend::pallet::Call<T>
   **/
  PalletUniversalDividendCall: {
    _enum: {
      claim_uds: 'Null',
      transfer_ud: {
        dest: 'MultiAddress',
        value: 'Compact<u64>',
      },
      transfer_ud_keep_alive: {
        dest: 'MultiAddress',
        value: 'Compact<u64>'
      }
    }
  },
  /**
   * Lookup161: pallet_identity::pallet::Call<T>
   **/
  PalletIdentityCall: {
    _enum: {
      create_identity: {
        ownerKey: 'AccountId32',
      },
      confirm_identity: {
        idtyName: 'Bytes',
      },
      __Unused2: 'Null',
      change_owner_key: {
        newKey: 'AccountId32',
        newKeySig: 'SpRuntimeMultiSignature',
      },
      revoke_identity: {
        idtyIndex: 'u32',
        revocationKey: 'AccountId32',
        revocationSig: 'SpRuntimeMultiSignature',
      },
      __Unused5: 'Null',
      prune_item_identities_names: {
        names: 'Vec<Bytes>',
      },
      fix_sufficients: {
        ownerKey: 'AccountId32',
        inc: 'bool',
      },
      link_account: {
        accountId: 'AccountId32',
        payloadSig: 'SpRuntimeMultiSignature'
      }
    }
  },
  /**
   * Lookup162: sp_runtime::MultiSignature
   **/
  SpRuntimeMultiSignature: {
    _enum: {
      Ed25519: 'SpCoreEd25519Signature',
      Sr25519: 'SpCoreSr25519Signature',
      Ecdsa: 'SpCoreEcdsaSignature'
    }
  },
  /**
   * Lookup163: sp_core::ecdsa::Signature
   **/
  SpCoreEcdsaSignature: '[u8;65]',
  /**
   * Lookup166: pallet_certification::pallet::Call<T>
   **/
  PalletCertificationCall: {
    _enum: {
      add_cert: {
        receiver: 'u32',
      },
      del_cert: {
        issuer: 'u32',
        receiver: 'u32',
      },
      remove_all_certs_received_by: {
        idtyIndex: 'u32',
      },
      renew_cert: {
        receiver: 'u32'
      }
    }
  },
  /**
   * Lookup167: pallet_distance::pallet::Call<T>
   **/
  PalletDistanceCall: {
    _enum: {
      request_distance_evaluation: 'Null',
      update_evaluation: {
        computationResult: 'SpDistanceComputationResult',
      },
      force_update_evaluation: {
        evaluator: 'AccountId32',
        computationResult: 'SpDistanceComputationResult',
      },
      force_valid_distance_status: {
        identity: 'u32',
      },
      request_distance_evaluation_for: {
        target: 'u32'
      }
    }
  },
  /**
   * Lookup168: sp_distance::ComputationResult
   **/
  SpDistanceComputationResult: {
    distances: 'Vec<Perbill>'
  },
  /**
   * Lookup171: pallet_atomic_swap::pallet::Call<T>
   **/
  PalletAtomicSwapCall: {
    _enum: {
      create_swap: {
        target: 'AccountId32',
        hashedProof: '[u8;32]',
        action: 'PalletAtomicSwapBalanceSwapAction',
        duration: 'u32',
      },
      claim_swap: {
        proof: 'Bytes',
        action: 'PalletAtomicSwapBalanceSwapAction',
      },
      cancel_swap: {
        target: 'AccountId32',
        hashedProof: '[u8;32]'
      }
    }
  },
  /**
   * Lookup172: pallet_multisig::pallet::Call<T>
   **/
  PalletMultisigCall: {
    _enum: {
      as_multi_threshold_1: {
        otherSignatories: 'Vec<AccountId32>',
        call: 'Call',
      },
      as_multi: {
        threshold: 'u16',
        otherSignatories: 'Vec<AccountId32>',
        maybeTimepoint: 'Option<PalletMultisigTimepoint>',
        call: 'Call',
        maxWeight: 'SpWeightsWeightV2Weight',
      },
      approve_as_multi: {
        threshold: 'u16',
        otherSignatories: 'Vec<AccountId32>',
        maybeTimepoint: 'Option<PalletMultisigTimepoint>',
        callHash: '[u8;32]',
        maxWeight: 'SpWeightsWeightV2Weight',
      },
      cancel_as_multi: {
        threshold: 'u16',
        otherSignatories: 'Vec<AccountId32>',
        timepoint: 'PalletMultisigTimepoint',
        callHash: '[u8;32]'
      }
    }
  },
  /**
   * Lookup174: pallet_provide_randomness::pallet::Call<T>
   **/
  PalletProvideRandomnessCall: {
    _enum: {
      request: {
        randomnessType: 'PalletProvideRandomnessRandomnessType',
        salt: 'H256'
      }
    }
  },
  /**
   * Lookup175: pallet_proxy::pallet::Call<T>
   **/
  PalletProxyCall: {
    _enum: {
      proxy: {
        real: 'MultiAddress',
        forceProxyType: 'Option<GdevRuntimeProxyType>',
        call: 'Call',
      },
      add_proxy: {
        delegate: 'MultiAddress',
        proxyType: 'GdevRuntimeProxyType',
        delay: 'u32',
      },
      remove_proxy: {
        delegate: 'MultiAddress',
        proxyType: 'GdevRuntimeProxyType',
        delay: 'u32',
      },
      remove_proxies: 'Null',
      create_pure: {
        proxyType: 'GdevRuntimeProxyType',
        delay: 'u32',
        index: 'u16',
      },
      kill_pure: {
        spawner: 'MultiAddress',
        proxyType: 'GdevRuntimeProxyType',
        index: 'u16',
        height: 'Compact<u32>',
        extIndex: 'Compact<u32>',
      },
      announce: {
        real: 'MultiAddress',
        callHash: 'H256',
      },
      remove_announcement: {
        real: 'MultiAddress',
        callHash: 'H256',
      },
      reject_announcement: {
        delegate: 'MultiAddress',
        callHash: 'H256',
      },
      proxy_announced: {
        delegate: 'MultiAddress',
        real: 'MultiAddress',
        forceProxyType: 'Option<GdevRuntimeProxyType>',
        call: 'Call'
      }
    }
  },
  /**
   * Lookup177: pallet_utility::pallet::Call<T>
   **/
  PalletUtilityCall: {
    _enum: {
      batch: {
        calls: 'Vec<Call>',
      },
      as_derivative: {
        index: 'u16',
        call: 'Call',
      },
      batch_all: {
        calls: 'Vec<Call>',
      },
      dispatch_as: {
        asOrigin: 'GdevRuntimeOriginCaller',
        call: 'Call',
      },
      force_batch: {
        calls: 'Vec<Call>',
      },
      with_weight: {
        call: 'Call',
        weight: 'SpWeightsWeightV2Weight'
      }
    }
  },
  /**
   * Lookup179: gdev_runtime::OriginCaller
   **/
  GdevRuntimeOriginCaller: {
    _enum: {
      system: 'FrameSupportDispatchRawOrigin',
      __Unused1: 'Null',
      Void: 'SpCoreVoid',
      __Unused3: 'Null',
      __Unused4: 'Null',
      __Unused5: 'Null',
      __Unused6: 'Null',
      __Unused7: 'Null',
      __Unused8: 'Null',
      __Unused9: 'Null',
      __Unused10: 'Null',
      __Unused11: 'Null',
      __Unused12: 'Null',
      __Unused13: 'Null',
      __Unused14: 'Null',
      __Unused15: 'Null',
      __Unused16: 'Null',
      __Unused17: 'Null',
      __Unused18: 'Null',
      __Unused19: 'Null',
      __Unused20: 'Null',
      __Unused21: 'Null',
      __Unused22: 'Null',
      TechnicalCommittee: 'PalletCollectiveRawOrigin'
    }
  },
  /**
   * Lookup180: frame_support::dispatch::RawOrigin<sp_core::crypto::AccountId32>
   **/
  FrameSupportDispatchRawOrigin: {
    _enum: {
      Root: 'Null',
      Signed: 'AccountId32',
      None: 'Null'
    }
  },
  /**
   * Lookup181: pallet_collective::RawOrigin<sp_core::crypto::AccountId32, I>
   **/
  PalletCollectiveRawOrigin: {
    _enum: {
      Members: '(u32,u32)',
      Member: 'AccountId32',
      _Phantom: 'Null'
    }
  },
  /**
   * Lookup182: sp_core::Void
   **/
  SpCoreVoid: 'Null',
  /**
   * Lookup183: pallet_treasury::pallet::Call<T, I>
   **/
  PalletTreasuryCall: {
    _enum: {
      propose_spend: {
        value: 'Compact<u64>',
        beneficiary: 'MultiAddress',
      },
      reject_proposal: {
        proposalId: 'Compact<u32>',
      },
      approve_proposal: {
        proposalId: 'Compact<u32>',
      },
      spend_local: {
        amount: 'Compact<u64>',
        beneficiary: 'MultiAddress',
      },
      remove_approval: {
        proposalId: 'Compact<u32>',
      },
      spend: {
        assetKind: 'Null',
        amount: 'Compact<u64>',
        beneficiary: 'MultiAddress',
        validFrom: 'Option<u32>',
      },
      payout: {
        index: 'u32',
      },
      check_status: {
        index: 'u32',
      },
      void_spend: {
        index: 'u32'
      }
    }
  },
  /**
   * Lookup184: sp_runtime::traits::BlakeTwo256
   **/
  SpRuntimeBlakeTwo256: 'Null',
  /**
   * Lookup187: pallet_scheduler::pallet::Error<T>
   **/
  PalletSchedulerError: {
    _enum: ['FailedToSchedule', 'NotFound', 'TargetBlockNumberInPast', 'RescheduleNoChange', 'Named']
  },
  /**
   * Lookup194: sp_consensus_babe::digests::PreDigest
   **/
  SpConsensusBabeDigestsPreDigest: {
    _enum: {
      __Unused0: 'Null',
      Primary: 'SpConsensusBabeDigestsPrimaryPreDigest',
      SecondaryPlain: 'SpConsensusBabeDigestsSecondaryPlainPreDigest',
      SecondaryVRF: 'SpConsensusBabeDigestsSecondaryVRFPreDigest'
    }
  },
  /**
   * Lookup195: sp_consensus_babe::digests::PrimaryPreDigest
   **/
  SpConsensusBabeDigestsPrimaryPreDigest: {
    authorityIndex: 'u32',
    slot: 'u64',
    vrfSignature: 'SpCoreSr25519VrfVrfSignature'
  },
  /**
   * Lookup196: sp_core::sr25519::vrf::VrfSignature
   **/
  SpCoreSr25519VrfVrfSignature: {
    preOutput: '[u8;32]',
    proof: '[u8;64]'
  },
  /**
   * Lookup197: sp_consensus_babe::digests::SecondaryPlainPreDigest
   **/
  SpConsensusBabeDigestsSecondaryPlainPreDigest: {
    authorityIndex: 'u32',
    slot: 'u64'
  },
  /**
   * Lookup198: sp_consensus_babe::digests::SecondaryVRFPreDigest
   **/
  SpConsensusBabeDigestsSecondaryVRFPreDigest: {
    authorityIndex: 'u32',
    slot: 'u64',
    vrfSignature: 'SpCoreSr25519VrfVrfSignature'
  },
  /**
   * Lookup199: sp_consensus_babe::BabeEpochConfiguration
   **/
  SpConsensusBabeBabeEpochConfiguration: {
    c: '(u64,u64)',
    allowedSlots: 'SpConsensusBabeAllowedSlots'
  },
  /**
   * Lookup203: pallet_babe::pallet::Error<T>
   **/
  PalletBabeError: {
    _enum: ['InvalidEquivocationProof', 'InvalidKeyOwnershipProof', 'DuplicateOffenceReport', 'InvalidConfiguration']
  },
  /**
   * Lookup204: pallet_duniter_test_parameters::types::Parameters<BlockNumber, CertCount, PeriodCount, SessionCount>
   **/
  PalletDuniterTestParametersParameters: {
    babeEpochDuration: 'u64',
    certPeriod: 'u32',
    certMaxByIssuer: 'u32',
    certMinReceivedCertToIssueCert: 'u32',
    certValidityPeriod: 'u32',
    idtyConfirmPeriod: 'u32',
    idtyCreationPeriod: 'u32',
    membershipPeriod: 'u32',
    membershipRenewalPeriod: 'u32',
    udCreationPeriod: 'u64',
    udReevalPeriod: 'u64',
    smithCertMaxByIssuer: 'u32',
    smithWotMinCertForMembership: 'u32',
    smithInactivityMaxDuration: 'u32',
    wotFirstCertIssuableOn: 'u32',
    wotMinCertForCreateIdtyRight: 'u32',
    wotMinCertForMembership: 'u32'
  },
  /**
   * Lookup205: pallet_balances::types::AccountData<Balance>
   **/
  PalletBalancesAccountData: {
    free: 'u64',
    reserved: 'u64',
    frozen: 'u64',
    flags: 'u128'
  },
  /**
   * Lookup209: pallet_balances::types::BalanceLock<Balance>
   **/
  PalletBalancesBalanceLock: {
    id: '[u8;8]',
    amount: 'u64',
    reasons: 'PalletBalancesReasons'
  },
  /**
   * Lookup210: pallet_balances::types::Reasons
   **/
  PalletBalancesReasons: {
    _enum: ['Fee', 'Misc', 'All']
  },
  /**
   * Lookup213: pallet_balances::types::ReserveData<ReserveIdentifier, Balance>
   **/
  PalletBalancesReserveData: {
    id: '[u8;8]',
    amount: 'u64'
  },
  /**
   * Lookup216: pallet_balances::types::IdAmount<Id, Balance>
   **/
  PalletBalancesIdAmount: {
    id: 'Null',
    amount: 'u64'
  },
  /**
   * Lookup218: pallet_balances::pallet::Error<T, I>
   **/
  PalletBalancesError: {
    _enum: ['VestingBalance', 'LiquidityRestrictions', 'InsufficientBalance', 'ExistentialDeposit', 'Expendability', 'ExistingVestingSchedule', 'DeadAccount', 'TooManyReserves', 'TooManyHolds', 'TooManyFreezes']
  },
  /**
   * Lookup220: pallet_transaction_payment::Releases
   **/
  PalletTransactionPaymentReleases: {
    _enum: ['V1Ancient', 'V2']
  },
  /**
   * Lookup221: pallet_oneshot_account::pallet::Error<T>
   **/
  PalletOneshotAccountError: {
    _enum: ['BlockHeightInFuture', 'BlockHeightTooOld', 'DestAccountNotExist', 'ExistentialDeposit', 'InsufficientBalance', 'OneshotAccountAlreadyCreated', 'OneshotAccountNotExist']
  },
  /**
   * Lookup222: pallet_quota::pallet::Quota<BlockNumber, Balance>
   **/
  PalletQuotaQuota: {
    lastUse: 'u32',
    amount: 'u64'
  },
  /**
   * Lookup224: pallet_quota::pallet::Refund<sp_core::crypto::AccountId32, IdtyId, Balance>
   **/
  PalletQuotaRefund: {
    account: 'AccountId32',
    identity: 'u32',
    amount: 'u64'
  },
  /**
   * Lookup226: pallet_smith_members::types::SmithMeta<IdtyIndex>
   **/
  PalletSmithMembersSmithMeta: {
    status: 'PalletSmithMembersSmithStatus',
    expiresOn: 'Option<u32>',
    issuedCerts: 'Vec<u32>',
    receivedCerts: 'Vec<u32>'
  },
  /**
   * Lookup227: pallet_smith_members::SmithStatus
   **/
  PalletSmithMembersSmithStatus: {
    _enum: ['Invited', 'Pending', 'Smith', 'Excluded']
  },
  /**
   * Lookup228: pallet_smith_members::pallet::Error<T>
   **/
  PalletSmithMembersError: {
    _enum: ['OriginMustHaveAnIdentity', 'OriginHasNeverBeenInvited', 'InvitationIsASmithPrivilege', 'InvitationIsAOnlineSmithPrivilege', 'InvitationAlreadyAccepted', 'InvitationOfExistingNonExcluded', 'InvitationOfNonMember', 'CertificationMustBeAgreed', 'CertificationOnExcludedIsForbidden', 'CertificationIsASmithPrivilege', 'CertificationIsAOnlineSmithPrivilege', 'CertificationOfSelfIsForbidden', 'CertificationReceiverMustHaveBeenInvited', 'CertificationAlreadyExists', 'CertificationStockFullyConsumed']
  },
  /**
   * Lookup229: pallet_authority_members::types::MemberData<sp_core::crypto::AccountId32>
   **/
  PalletAuthorityMembersMemberData: {
    ownerKey: 'AccountId32'
  },
  /**
   * Lookup230: pallet_authority_members::pallet::Error<T>
   **/
  PalletAuthorityMembersError: {
    _enum: ['AlreadyIncoming', 'AlreadyOnline', 'AlreadyOutgoing', 'MemberIdNotFound', 'MemberBlacklisted', 'MemberNotBlacklisted', 'MemberNotFound', 'NotOnlineNorIncoming', 'NotMember', 'SessionKeysNotProvided', 'TooManyAuthorities']
  },
  /**
   * Lookup231: sp_staking::offence::OffenceDetails<sp_core::crypto::AccountId32, Offender>
   **/
  SpStakingOffenceOffenceDetails: {
    offender: '(AccountId32,CommonRuntimeEntitiesValidatorFullIdentification)',
    reporters: 'Vec<AccountId32>'
  },
  /**
   * Lookup237: sp_core::crypto::KeyTypeId
   **/
  SpCoreCryptoKeyTypeId: '[u8;4]',
  /**
   * Lookup238: pallet_session::pallet::Error<T>
   **/
  PalletSessionError: {
    _enum: ['InvalidProof', 'NoAssociatedValidatorId', 'DuplicatedKey', 'NoKeys', 'NoAccount']
  },
  /**
   * Lookup239: pallet_grandpa::StoredState<N>
   **/
  PalletGrandpaStoredState: {
    _enum: {
      Live: 'Null',
      PendingPause: {
        scheduledAt: 'u32',
        delay: 'u32',
      },
      Paused: 'Null',
      PendingResume: {
        scheduledAt: 'u32',
        delay: 'u32'
      }
    }
  },
  /**
   * Lookup240: pallet_grandpa::StoredPendingChange<N, Limit>
   **/
  PalletGrandpaStoredPendingChange: {
    scheduledAt: 'u32',
    delay: 'u32',
    nextAuthorities: 'Vec<(SpConsensusGrandpaAppPublic,u64)>',
    forced: 'Option<u32>'
  },
  /**
   * Lookup242: pallet_grandpa::pallet::Error<T>
   **/
  PalletGrandpaError: {
    _enum: ['PauseFailed', 'ResumeFailed', 'ChangePending', 'TooSoon', 'InvalidKeyOwnershipProof', 'InvalidEquivocationProof', 'DuplicateOffenceReport']
  },
  /**
   * Lookup246: pallet_im_online::pallet::Error<T>
   **/
  PalletImOnlineError: {
    _enum: ['InvalidKey', 'DuplicatedHeartbeat']
  },
  /**
   * Lookup249: pallet_sudo::pallet::Error<T>
   **/
  PalletSudoError: {
    _enum: ['RequireSudo']
  },
  /**
   * Lookup250: pallet_preimage::OldRequestStatus<sp_core::crypto::AccountId32, Balance>
   **/
  PalletPreimageOldRequestStatus: {
    _enum: {
      Unrequested: {
        deposit: '(AccountId32,u64)',
        len: 'u32',
      },
      Requested: {
        deposit: 'Option<(AccountId32,u64)>',
        count: 'u32',
        len: 'Option<u32>'
      }
    }
  },
  /**
   * Lookup251: pallet_preimage::RequestStatus<sp_core::crypto::AccountId32, Ticket>
   **/
  PalletPreimageRequestStatus: {
    _enum: {
      Unrequested: {
        ticket: '(AccountId32,Null)',
        len: 'u32',
      },
      Requested: {
        maybeTicket: 'Option<(AccountId32,Null)>',
        count: 'u32',
        maybeLen: 'Option<u32>'
      }
    }
  },
  /**
   * Lookup255: pallet_preimage::pallet::Error<T>
   **/
  PalletPreimageError: {
    _enum: ['TooBig', 'AlreadyNoted', 'NotAuthorized', 'NotNoted', 'Requested', 'NotRequested', 'TooMany', 'TooFew']
  },
  /**
   * Lookup257: pallet_collective::Votes<sp_core::crypto::AccountId32, BlockNumber>
   **/
  PalletCollectiveVotes: {
    index: 'u32',
    threshold: 'u32',
    ayes: 'Vec<AccountId32>',
    nays: 'Vec<AccountId32>',
    end: 'u32'
  },
  /**
   * Lookup258: pallet_collective::pallet::Error<T, I>
   **/
  PalletCollectiveError: {
    _enum: ['NotMember', 'DuplicateProposal', 'ProposalMissing', 'WrongIndex', 'DuplicateVote', 'AlreadyInitialized', 'TooEarly', 'TooManyProposals', 'WrongProposalWeight', 'WrongProposalLength', 'PrimeAccountNotMember']
  },
  /**
   * Lookup262: pallet_universal_dividend::pallet::Error<T>
   **/
  PalletUniversalDividendError: {
    _enum: ['AccountNotAllowedToClaimUds']
  },
  /**
   * Lookup263: pallet_duniter_wot::pallet::Error<T>
   **/
  PalletDuniterWotError: {
    _enum: ['NotEnoughCerts', 'TargetStatusInvalid', 'IdtyCreationPeriodNotRespected', 'NotEnoughReceivedCertsToCreateIdty', 'MaxEmittedCertsReached', 'IssuerNotMember', 'IdtyNotFound', 'MembershipRenewalPeriodNotRespected']
  },
  /**
   * Lookup264: pallet_identity::types::IdtyValue<BlockNumber, sp_core::crypto::AccountId32, common_runtime::entities::IdtyData>
   **/
  PalletIdentityIdtyValue: {
    data: 'CommonRuntimeEntitiesIdtyData',
    nextCreatableIdentityOn: 'u32',
    oldOwnerKey: 'Option<(AccountId32,u32)>',
    ownerKey: 'AccountId32',
    nextScheduled: 'u32',
    status: 'PalletIdentityIdtyStatus'
  },
  /**
   * Lookup265: common_runtime::entities::IdtyData
   **/
  CommonRuntimeEntitiesIdtyData: {
    firstEligibleUd: 'u16'
  },
  /**
   * Lookup268: pallet_identity::types::IdtyStatus
   **/
  PalletIdentityIdtyStatus: {
    _enum: ['Unconfirmed', 'Unvalidated', 'Member', 'NotMember', 'Revoked']
  },
  /**
   * Lookup269: pallet_identity::pallet::Error<T>
   **/
  PalletIdentityError: {
    _enum: ['IdtyAlreadyConfirmed', 'IdtyAlreadyCreated', 'IdtyIndexNotFound', 'IdtyNameAlreadyExist', 'IdtyNameInvalid', 'IdtyNotFound', 'InvalidSignature', 'InvalidRevocationKey', 'IssuerNotMember', 'NotRespectIdtyCreationPeriod', 'OwnerKeyAlreadyRecentlyChanged', 'OwnerKeyAlreadyUsed', 'ProhibitedToRevertToAnOldKey', 'AlreadyRevoked', 'CanNotRevokeUnconfirmed', 'CanNotRevokeUnvalidated', 'AccountNotExist']
  },
  /**
   * Lookup270: sp_membership::MembershipData<BlockNumber>
   **/
  SpMembershipMembershipData: {
    expireOn: 'u32'
  },
  /**
   * Lookup271: pallet_membership::pallet::Error<T>
   **/
  PalletMembershipError: {
    _enum: ['MembershipNotFound', 'AlreadyMember']
  },
  /**
   * Lookup272: pallet_certification::types::IdtyCertMeta<BlockNumber>
   **/
  PalletCertificationIdtyCertMeta: {
    issuedCount: 'u32',
    nextIssuableOn: 'u32',
    receivedCount: 'u32'
  },
  /**
   * Lookup273: pallet_certification::pallet::Error<T>
   **/
  PalletCertificationError: {
    _enum: ['OriginMustHaveAnIdentity', 'CannotCertifySelf', 'IssuedTooManyCert', 'NotEnoughCertReceived', 'NotRespectCertPeriod', 'CertAlreadyExists', 'CertDoesNotExist']
  },
  /**
   * Lookup274: pallet_distance::types::EvaluationPool<sp_core::crypto::AccountId32, IdtyIndex>
   **/
  PalletDistanceEvaluationPool: {
    evaluations: 'Vec<(u32,PalletDistanceMedianMedianAcc)>',
    evaluators: 'BTreeSet<AccountId32>'
  },
  /**
   * Lookup277: pallet_distance::median::MedianAcc<sp_arithmetic::per_things::Perbill>
   **/
  PalletDistanceMedianMedianAcc: {
    samples: 'Vec<(Perbill,u32)>',
    medianIndex: 'Option<u32>',
    medianSubindex: 'u32'
  },
  /**
   * Lookup284: pallet_distance::pallet::Error<T>
   **/
  PalletDistanceError: {
    _enum: ['AlreadyInEvaluation', 'TooManyEvaluationsByAuthor', 'TooManyEvaluationsInBlock', 'NoAuthor', 'CallerHasNoIdentity', 'CallerIdentityNotFound', 'CallerNotMember', 'CallerStatusInvalid', 'TargetIdentityNotFound', 'QueueFull', 'TooManyEvaluators', 'WrongResultLength', 'TargetMustBeUnvalidated']
  },
  /**
   * Lookup286: pallet_atomic_swap::pallet::Error<T>
   **/
  PalletAtomicSwapError: {
    _enum: ['AlreadyExist', 'InvalidProof', 'ProofTooLarge', 'SourceMismatch', 'AlreadyClaimed', 'NotExist', 'ClaimActionMismatch', 'DurationNotPassed']
  },
  /**
   * Lookup287: pallet_multisig::Multisig<BlockNumber, Balance, sp_core::crypto::AccountId32, MaxApprovals>
   **/
  PalletMultisigMultisig: {
    when: 'PalletMultisigTimepoint',
    deposit: 'u64',
    depositor: 'AccountId32',
    approvals: 'Vec<AccountId32>'
  },
  /**
   * Lookup289: pallet_multisig::pallet::Error<T>
   **/
  PalletMultisigError: {
    _enum: ['MinimumThreshold', 'AlreadyApproved', 'NoApprovalsNeeded', 'TooFewSignatories', 'TooManySignatories', 'SignatoriesOutOfOrder', 'SenderInSignatories', 'NotFound', 'NotOwner', 'NoTimepoint', 'WrongTimepoint', 'UnexpectedTimepoint', 'MaxWeightTooLow', 'AlreadyStored']
  },
  /**
   * Lookup291: pallet_provide_randomness::types::Request
   **/
  PalletProvideRandomnessRequest: {
    requestId: 'u64',
    salt: 'H256'
  },
  /**
   * Lookup292: pallet_provide_randomness::pallet::Error<T>
   **/
  PalletProvideRandomnessError: {
    _enum: ['QueueFull']
  },
  /**
   * Lookup295: pallet_proxy::ProxyDefinition<sp_core::crypto::AccountId32, gdev_runtime::ProxyType, BlockNumber>
   **/
  PalletProxyProxyDefinition: {
    delegate: 'AccountId32',
    proxyType: 'GdevRuntimeProxyType',
    delay: 'u32'
  },
  /**
   * Lookup299: pallet_proxy::Announcement<sp_core::crypto::AccountId32, primitive_types::H256, BlockNumber>
   **/
  PalletProxyAnnouncement: {
    real: 'AccountId32',
    callHash: 'H256',
    height: 'u32'
  },
  /**
   * Lookup301: pallet_proxy::pallet::Error<T>
   **/
  PalletProxyError: {
    _enum: ['TooMany', 'NotFound', 'NotProxy', 'Unproxyable', 'Duplicate', 'NoPermission', 'Unannounced', 'NoSelfProxy']
  },
  /**
   * Lookup302: pallet_utility::pallet::Error<T>
   **/
  PalletUtilityError: {
    _enum: ['TooManyCalls']
  },
  /**
   * Lookup303: pallet_treasury::Proposal<sp_core::crypto::AccountId32, Balance>
   **/
  PalletTreasuryProposal: {
    proposer: 'AccountId32',
    value: 'u64',
    beneficiary: 'AccountId32',
    bond: 'u64'
  },
  /**
   * Lookup305: pallet_treasury::SpendStatus<AssetKind, AssetBalance, sp_core::crypto::AccountId32, BlockNumber, PaymentId>
   **/
  PalletTreasurySpendStatus: {
    assetKind: 'Null',
    amount: 'u64',
    beneficiary: 'AccountId32',
    validFrom: 'u32',
    expireAt: 'u32',
    status: 'PalletTreasuryPaymentState'
  },
  /**
   * Lookup306: pallet_treasury::PaymentState<Id>
   **/
  PalletTreasuryPaymentState: {
    _enum: {
      Pending: 'Null',
      Attempted: {
        id: 'Null',
      },
      Failed: 'Null'
    }
  },
  /**
   * Lookup309: frame_support::PalletId
   **/
  FrameSupportPalletId: '[u8;8]',
  /**
   * Lookup310: pallet_treasury::pallet::Error<T, I>
   **/
  PalletTreasuryError: {
    _enum: ['InsufficientProposersBalance', 'InvalidIndex', 'TooManyApprovals', 'InsufficientPermission', 'ProposalNotApproved', 'FailedToConvertBalance', 'SpendExpired', 'EarlyPayout', 'AlreadyAttempted', 'PayoutError', 'NotAttempted', 'Inconclusive']
  },
  /**
   * Lookup313: frame_system::extensions::check_non_zero_sender::CheckNonZeroSender<T>
   **/
  FrameSystemExtensionsCheckNonZeroSender: 'Null',
  /**
   * Lookup314: frame_system::extensions::check_spec_version::CheckSpecVersion<T>
   **/
  FrameSystemExtensionsCheckSpecVersion: 'Null',
  /**
   * Lookup315: frame_system::extensions::check_tx_version::CheckTxVersion<T>
   **/
  FrameSystemExtensionsCheckTxVersion: 'Null',
  /**
   * Lookup316: frame_system::extensions::check_genesis::CheckGenesis<T>
   **/
  FrameSystemExtensionsCheckGenesis: 'Null',
  /**
   * Lookup319: pallet_oneshot_account::check_nonce::CheckNonce<gdev_runtime::Runtime>
   **/
  PalletOneshotAccountCheckNonce: 'FrameSystemExtensionsCheckNonce',
  /**
   * Lookup320: gdev_runtime::Runtime
   **/
  GdevRuntimeRuntime: 'Null',
  /**
   * Lookup321: frame_system::extensions::check_nonce::CheckNonce<T>
   **/
  FrameSystemExtensionsCheckNonce: 'Compact<u32>',
  /**
   * Lookup322: frame_system::extensions::check_weight::CheckWeight<T>
   **/
  FrameSystemExtensionsCheckWeight: 'Null',
  /**
   * Lookup323: pallet_transaction_payment::ChargeTransactionPayment<T>
   **/
  PalletTransactionPaymentChargeTransactionPayment: 'Compact<u64>'
};
