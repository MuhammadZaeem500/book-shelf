"use client";

import React, { useState, useEffect, useCallback } from "react";
import { BookOpen, Heart, UserPlus, Bell, Check, X, Loader2 } from "lucide-react";
import { fetchApi } from "@/src/app/lib/api";
import { NotificationDropdownProps, NotificationItem } from "@/src/types";


export default function NotificationDropdown({
  isOpen,
  onClose,
  onUnreadCountChange,
}: NotificationDropdownProps) {
  const [notifications, setNotifications] = useState<NotificationItem[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const loadNotifications = useCallback(async (isBackground = false) => {
    try {
      if (!isBackground) setLoading(true);
      const data = await fetchApi<NotificationItem[]>("/users/me/notifications");
      if (Array.isArray(data)) {
        setNotifications(data);
        const unread = data.filter((n) => n.unread).length;
        if (onUnreadCountChange) onUnreadCountChange(unread);
      }
    } catch (err) {
      console.error("Failed to load notifications:", err);
    } finally {
      if (!isBackground) setLoading(false);
    }
  }, [onUnreadCountChange]);

  useEffect(() => {
    if (isOpen) {
      loadNotifications(false);

      const interval = setInterval(() => {
        loadNotifications(true);
      }, 30000);

      return () => clearInterval(interval);
    }
  }, [isOpen, loadNotifications]);

  const handleMarkAsRead = async () => {
    try {
      // Instantly clear the list and reset count on the UI so items vanish immediately
      setNotifications([]);
      if (onUnreadCountChange) onUnreadCountChange(0);

      // Call backend endpoint to mark all as read
      await fetchApi("/users/me/notifications/read", {
        method: "PATCH",
      });
    } catch (err) {
      console.error("Failed to mark notifications as read:", err);
      loadNotifications(false);
    }
  };

  if (!isOpen) return null;

  const renderIcon = (type: NotificationItem["type"]) => {
    switch (type) {
      case "like":
        return <Heart className="w-3.5 h-3.5 text-[#C85A2B]" />;
      case "follow":
        return <UserPlus className="w-3.5 h-3.5 text-[#A65B17]" />;
      case "read":
        return <BookOpen className="w-3.5 h-3.5 text-[#524B45]" />;
      default:
        return <Bell className="w-3.5 h-3.5 text-[#524B45]" />;
    }
  };

  const unreadCount = notifications.filter((n) => n.unread).length;

  return (
    <>
      {/* Backdrop overlay */}
      <div
        className="fixed inset-0 z-40 bg-black/20 sm:bg-transparent backdrop-blur-[1px] sm:backdrop-blur-none transition-opacity"
        onClick={onClose}
      />

      {/* Dropdown Card */}
      <div className="fixed inset-x-3 top-16 sm:absolute sm:inset-auto sm:right-0 sm:top-full sm:mt-2 w-auto sm:w-88 bg-[#FAF7F2] border border-[#E8E0D5] rounded-2xl shadow-2xl sm:shadow-xl z-50 overflow-hidden flex flex-col max-h-[80vh] sm:max-h-105">
        {/* Header */}
        <div className="flex items-center justify-between p-3.5 px-4 border-b border-[#E8E0D5] bg-[#F5F0EB]/50 shrink-0">
          <div className="flex items-center gap-2">
            <h4 className="text-xs font-bold text-[#1A1817]">Notifications</h4>
            <span className="bg-[#C85A2B]/10 text-[#C85A2B] text-[10px] font-bold px-2 py-0.5 rounded-full">
              {unreadCount} new
            </span>
          </div>
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={handleMarkAsRead}
              className="text-[11px] font-semibold text-[#736B63] hover:text-[#C85A2B] transition-colors flex items-center gap-1 cursor-pointer"
            >
              <Check className="w-3 h-3" /> Mark read
            </button>
            <button
              type="button"
              onClick={onClose}
              className="sm:hidden text-[#736B63] hover:text-[#1A1817] p-1 rounded-lg"
              aria-label="Close notifications"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Scrollable Notifications List */}
        <div className="divide-y divide-[#E8E0D5]/60 overflow-y-auto max-h-80 sm:max-h-85 pr-1 [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-track]:bg-[#F5F0EB] [&::-webkit-scrollbar-thumb]:bg-[#D8CFC4] [&::-webkit-scrollbar-thumb]:rounded-full hover:[&::-webkit-scrollbar-thumb]:bg-[#C85A2B]/60">
          {loading ? (
            <div className="flex items-center justify-center py-10 text-[#8C837A] gap-2 text-xs">
              <Loader2 className="w-4 h-4 animate-spin text-[#C85A2B]" />
              Loading notifications...
            </div>
          ) : notifications.length === 0 ? (
            <div className="py-10 text-center text-xs text-[#8C837A]">
              No notifications yet.
            </div>
          ) : (
            notifications.map((item) => (
              <div
                key={item.id}
                className={`flex items-start gap-3 p-3.5 sm:p-3 transition-colors ${
                  item.unread ? "bg-[#F5F0EB]/80" : "hover:bg-[#F5F0EB]/40"
                }`}
              >
                <div className="p-1.5 rounded-lg bg-[#EFE8DF] shrink-0 mt-0.5">
                  {renderIcon(item.type)}
                </div>
                <div className="flex-1 min-w-0 space-y-0.5">
                  <p className="text-xs text-[#1A1817] leading-snug">
                    <span className="font-semibold">{item.user}</span>{" "}
                    {item.action}{" "}
                    {item.target && (
                      <span className="font-serif italic font-medium text-[#C85A2B]">
                        &quot;{item.target}&quot;
                      </span>
                    )}
                  </p>
                  <span className="text-[10px] text-[#8C837A] block">
                    {item.time}
                  </span>
                </div>
                {item.unread && (
                  <span className="w-1.5 h-1.5 rounded-full bg-[#C85A2B] shrink-0 mt-1.5" />
                )}
              </div>
            ))
          )}
        </div>
      </div>
    </>
  );
}``