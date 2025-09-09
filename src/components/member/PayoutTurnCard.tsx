// src/components/member/PayoutTurnCard.tsx
"use client";

import { motion } from "framer-motion";
import { Group, PayoutTurnCardProps } from "@/types/group";

export function PayoutTurnCard({ groups }: PayoutTurnCardProps) {
  // Find the group where user is next in line for payout (position closest to current round)
  const getNextPayoutTurn = (groups: Group[]) => {
    const activeGroups = groups.filter((group) => group.status === "active");
    if (activeGroups.length === 0) return null;

    // Find groups where user's turn is coming up
    const upcomingPayouts = activeGroups.filter(
      (group) =>
        group.myPosition > group.currentRound &&
        group.myPosition <= group.totalRounds
    );

    if (upcomingPayouts.length === 0) return null;

    // Return the group where user's turn is closest
    return upcomingPayouts.reduce((closest, current) => {
      const closestTurnsLeft = closest.myPosition - closest.currentRound;
      const currentTurnsLeft = current.myPosition - current.currentRound;
      return currentTurnsLeft < closestTurnsLeft ? current : closest;
    });
  };

  const payoutGroup = getNextPayoutTurn(groups);

  // If no upcoming payouts
  if (!payoutGroup) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white rounded-xl p-4 sm:p-6 shadow-sm border border-gray-100 relative overflow-hidden"
      >
        <div className="text-center py-8">
          <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg
              className="w-8 h-8 text-blue-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
          <h3 className="font-bold text-lg text-gray-900 mb-2">
            No Upcoming Payouts
          </h3>
          <p className="text-gray-600">
            Your payout turns are either completed or not yet scheduled.
          </p>
        </div>
      </motion.div>
    );
  }

  const turnsLeft = payoutGroup.myPosition - payoutGroup.currentRound;
  const isNext = turnsLeft === 1;
  const totalAmount = payoutGroup.contributionAmount * payoutGroup.totalMembers;

  // Calculate estimated date based on frequency and turns left
  const getEstimatedDate = (group: Group, turnsLeft: number) => {
    const nextPayment = new Date(group.nextPaymentDate);
    const monthsToAdd =
      turnsLeft *
      (group.frequency === "monthly"
        ? 1
        : group.frequency === "quarterly"
          ? 3
          : 12);
    nextPayment.setMonth(nextPayment.getMonth() + monthsToAdd);
    return nextPayment;
  };

  const estimatedDate = getEstimatedDate(payoutGroup, turnsLeft - 1);
  const progress =
    ((payoutGroup.totalMembers - turnsLeft + 1) / payoutGroup.totalMembers) *
    100;

  const handleContactCoordinator = () => {
    if (payoutGroup.coordinatorPhone) {
      const phoneNumber = payoutGroup.coordinatorPhone.replace(/\s/g, "");
      window.open(`tel:${phoneNumber}`, "_self");
    }
  };

  const handleViewGroupDetails = () => {
    window.location.href = `/member/groups/${payoutGroup.id}`;
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="bg-white rounded-xl p-4 sm:p-6 shadow-sm border border-gray-100 relative overflow-hidden"
    >
      {/* Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-green-500/10 to-blue-500/10"></div>

      <div className="relative z-10 space-y-4">
        <div className="flex items-start justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-green-500 to-blue-500 rounded-xl flex items-center justify-center flex-shrink-0">
              {payoutGroup.avatar ? (
                <span className="text-lg sm:text-xl">{payoutGroup.avatar}</span>
              ) : (
                <svg
                  className="w-5 h-5 sm:w-6 sm:h-6 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              )}
            </div>
            <div className="min-w-0 flex-1">
              <h3 className="font-bold text-base sm:text-lg text-gray-900">
                Payout Turn
              </h3>
              <p className="text-sm text-gray-600 truncate">
                {payoutGroup.name}
              </p>
            </div>
          </div>

          <div
            className={`px-2 py-1 rounded-full text-xs font-medium ${
              isNext
                ? "bg-green-100 text-green-700"
                : "bg-blue-100 text-blue-700"
            }`}
          >
            Position #{payoutGroup.myPosition}
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <p className="text-xs sm:text-sm text-gray-600 mb-1">
              Expected Payout
            </p>
            <p className="text-2xl sm:text-3xl font-bold text-green-600">
              ₹{totalAmount.toLocaleString()}
            </p>
          </div>

          <div>
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm text-gray-600">Queue Progress</span>
              <span className="text-sm font-medium">
                {payoutGroup.totalMembers - turnsLeft + 1} of{" "}
                {payoutGroup.totalMembers}
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <motion.div
                className="bg-gradient-to-r from-green-500 to-blue-500 h-2 rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 1, delay: 0.5 }}
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 py-3 border-t border-gray-100">
            <div>
              <p className="text-xs text-gray-500">Estimated Date</p>
              <p className="font-medium text-sm">
                {estimatedDate.toLocaleDateString()}
              </p>
            </div>
            <div>
              <p className="text-xs text-gray-500">Turns Left</p>
              <p className="font-medium text-sm">{turnsLeft} turns</p>
            </div>
          </div>

          {/* Coordinator Info */}
          {payoutGroup.coordinatorName && (
            <div className="bg-green-50 border border-green-100 rounded-lg p-3">
              <p className="text-xs text-green-600 mb-1">Payout Coordinator</p>
              <p className="text-sm font-medium text-green-800">
                {payoutGroup.coordinatorName}
                {payoutGroup.coordinatorPhone &&
                  ` • ${payoutGroup.coordinatorPhone}`}
              </p>
            </div>
          )}

          {isNext && (
            <div className="bg-green-50 border border-green-200 rounded-xl p-4">
              <div className="flex items-center space-x-2 mb-3">
                <span className="text-green-600 text-lg">🎉</span>
                <p className="text-sm text-green-800 font-medium">
                  You&apos;re next in line for the payout!
                </p>
              </div>

              {/* Border Button Layout - No Icons */}
              <div className="flex flex-col sm:flex-row gap-2">
                <button
                  onClick={handleContactCoordinator}
                  disabled={!payoutGroup.coordinatorPhone}
                  className="w-full sm:w-auto bg-green-600 text-white hover:bg-green-700 disabled:bg-gray-400 disabled:cursor-not-allowed px-3 py-2 rounded-lg text-sm font-medium transition-all text-center"
                >
                  Contact Coordinator
                </button>

                <button
                  onClick={handleViewGroupDetails}
                  className="w-full sm:w-auto border-2 border-green-300 text-green-700 hover:border-green-400 hover:bg-green-50 px-3 py-2 rounded-lg text-sm font-medium transition-all text-center"
                >
                  View Details
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}
